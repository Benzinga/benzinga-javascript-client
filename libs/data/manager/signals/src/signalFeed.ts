import {
  Subscribable,
  Subscription,
  SubscribableReconnectingSocket,
  SubscribableReconnectingSocketEvent,
} from '@benzinga/subscribable';

import { screenerFiltersToScreenerQuery } from './generateParams';
import { Signal, SignalsScreenerFilter } from './entities';
import { SignalsRequest } from './requests';
import { AuthenticationManager, addParamsToURL, Session } from '@benzinga/session';
import { SignalsEnvironment } from './environment';
import { WatchlistManager } from '@benzinga/watchlist-manager';
import { WidgetLinkingManager } from '@benzinga/widget-linking';

interface LiveSignalEvent {
  signal: Signal;
  type: 'signals:live_signal';
}

interface HistoricSignalsEvent {
  signals: Signal[];
  type: 'signals:historic_signals';
}

interface FeedEvent {
  signalQuery: SignalsScreenerFilter[];
  signalType: SignalType[];
  type: 'signals:feed';
}

interface StatusEvent {
  status:
    | 'reconnected'
    | 'disconnected'
    | 'request_failed'
    | 'request_timeout'
    | 'request_success'
    | SignalFeed['mode'];
  type: 'signals:status';
}

export type SignalFeedEvent = FeedEvent | LiveSignalEvent | HistoricSignalsEvent | StatusEvent;

export class SignalFeed extends Subscribable<SignalFeedEvent> {
  private requestID = 1;
  private signalRequest: SignalsRequest;
  private signalQuery: SignalsScreenerFilter[] = [];
  private signalTypes: SignalType[] = [];

  private socket: SubscribableReconnectingSocket<string>;
  private socketSubscription?: Subscription<SubscribableReconnectingSocket<string>>;
  private authenticationManager: AuthenticationManager;

  private openHistoricLimit = 100;
  private openSubscribe = true;

  private mode: 'init' | 'running' | 'stopped' = 'stopped';
  private afterInitTask: 'none' | 'open' | 'stop' | 'init' = 'none';
  private restSignalsIdSet: Set<number> = new Set<number>();
  private watchlistManager: WatchlistManager;
  private linkingManager: WidgetLinkingManager;

  constructor(session: Session) {
    super();
    const url = addParamsToURL(session.getEnvironment(SignalsEnvironment).socketUrl, {
      apikey: session.getEnvironment(SignalsEnvironment).key,
    });

    this.socket = new SubscribableReconnectingSocket(url);
    this.signalRequest = new SignalsRequest(session, { authorizationSession: true });
    this.authenticationManager = session.getManager(AuthenticationManager);
    this.watchlistManager = session.getManager(WatchlistManager);
    this.linkingManager = session.getManager(WidgetLinkingManager);
  }

  public setFilters = (signalQuery: SignalsScreenerFilter[], signalTypes: SignalType[]): void => {
    this.signalQuery = signalQuery;
    this.signalTypes = signalTypes;
    if (this.mode === 'init') {
      this.afterInitTask = 'init';
    } else {
      if (this.mode === 'running') {
        this.init();
      }
    }
  };

  public open = async (historicLimit?: number, subscribe?: boolean): Promise<void> => {
    this.openHistoricLimit = historicLimit ?? this.openHistoricLimit;
    this.openSubscribe = subscribe ?? this.openSubscribe;

    if (this.mode === 'init') {
      this.afterInitTask = 'open';
    } else {
      if (this.mode === 'stopped') {
        if (this.openSubscribe) {
          await this.openSocket();
        }
      }
      await this.init();
    }
  };

  public stop = (): void => {
    if (this.mode === 'init') {
      this.afterInitTask = 'stop';
    } else {
      this.socketSubscription?.unsubscribe();
      this.setMode('stopped');
    }
  };

  public addSignal = (signal: Signal): void => {
    // here we are doing the magic of making sure that the signals we receive
    // from the REST call don't duplicate the signals from the socket.
    if (this.restSignalsIdSet.has(signal.id)) {
      return;
    }
    if (this.mode === 'init') {
      this.restSignalsIdSet.add(signal.id);
    }
    this.dispatch({ signal, type: 'signals:live_signal' });
  };

  public addHistoricSignals = (signals: Signal[]): void => {
    // here we are doing the magic of making sure that the signals we receive
    // from the REST call don't duplicate the signals from the socket.
    signals = signals.filter(s => !this.restSignalsIdSet.has(s.id));

    if (this.mode === 'init') {
      signals.forEach(s => this.restSignalsIdSet.add(s.id));
    }
    this.dispatch({ signals, type: 'signals:historic_signals' });
  };

  protected onZeroSubscriptions = (): void => this.stop();

  private init = async (): Promise<void> => {
    this.setMode('init');
    this.restSignalsIdSet.clear();

    this.dispatch({
      signalQuery: this.signalQuery,
      signalType: this.signalTypes,
      type: 'signals:feed',
    });

    if (this.openSubscribe) {
      this.subscribeToSocket();
    }

    if (this.openHistoricLimit > 0) {
      await this.getHistoricSignals();
    }

    if (this.openSubscribe) {
      this.setMode('running');
    } else {
      this.setMode('stopped');
    }
    switch (this.afterInitTask) {
      case 'open':
        this.afterInitTask = 'none';
        this.open();
        break;
      case 'stop':
        this.afterInitTask = 'none';
        this.stop();
        break;
      case 'init':
        this.afterInitTask = 'none';
        this.init();
        break;
    }
  };

  private setMode = (mode: SignalFeed['mode']): void => {
    this.mode = mode;
    this.dispatch({ status: mode, type: 'signals:status' });
  };

  private openSocket = async (): Promise<undefined> => {
    this.socketSubscription = this.socket.subscribe(this.onMessage);
    this.socket.open();
    return await this.sendAuth();
  };

  private sendAuth = async (): Promise<undefined> => {
    let token = this.authenticationManager.getBenzingaToken();
    if (token === undefined) {
      await this.authenticationManager.getSession();
      token = this.authenticationManager.getBenzingaToken();
    }
    this.socket.send(
      JSON.stringify({
        id: this.requestID,
        sessionId: token,
        type: SignalsMessageType.authReq,
      }),
    );
    return undefined;
  };

  private subscribeToSocket = (): void => {
    this.socket.send(
      JSON.stringify({
        screenerQuery:
          screenerFiltersToScreenerQuery(this.signalQuery, this.watchlistManager, this.linkingManager) ?? '',
        signalFilters: this.signalTypes,
        type: SignalsMessageType.feedRequest,
      }),
    );
  };

  private getHistoricSignals = async (): Promise<void> => {
    // TODO: it'd be nice if someone could write a bit as to why this `if` statement exists
    const signals = await (async () => {
      if (this.signalTypes.length !== 0) {
        const result = await this.signalRequest.getSignals(this.signalTypes, this.signalQuery);
        if (result.err) {
          this.dispatch({ status: 'request_failed', type: 'signals:status' });
          return [];
        } else {
          this.dispatch({ status: 'request_success', type: 'signals:status' });
          return result.ok.signals ?? [];
        }
      }
      return [];
    })();

    this.addHistoricSignals(signals);
  };

  private onMessage = (event: SubscribableReconnectingSocketEvent<string>): void => {
    switch (event.type) {
      case 'response': {
        const msg: SocketSignalMessage = JSON.parse(event.msg);
        switch (msg.type) {
          case 'Signal':
            this.addSignal(msg.payload);
            break;
        }
        break;
      }
      case 'disconnected':
        this.dispatch({ status: 'disconnected', type: 'signals:status' });
        break;
      case 'reconnected':
        this.dispatch({ status: 'reconnected', type: 'signals:status' });
        this.sendAuth();
        this.init();
        break;
    }
  };
}

interface SocketSignalMessage {
  payload: Signal;
  type: 'Signal';
}

enum SignalsMessageType {
  authReq = 'AuthRequest',
  authRes = 'AuthResponse',
  feedRequest = 'FeedRequest',
  heartbeat = 'Heartbeat',
  signal = 'Signal',
}

enum SignalType {
  blockTrade = 'BLOCK_TRADE',
  dayHighSeries = 'DAY_HIGH_SERIES',
  dayLowSeries = 'DAY_LOW_SERIES',
  fiftyTwoWeekHigh = 'FTW_HIGH',
  fiftyTwoWeekLow = 'FTW_LOW',
  gap = 'GAP',
  haultResume = 'HALT_RESUME',
  high = 'NEW_HIGH',
  low = 'NEW_LOW',
  option = 'OPTION_ACTIVITY',
  spike_up = 'PRICE_SPIKE_UP',
  spike_down = 'PRICE_SPIKE_DOWN',
}
