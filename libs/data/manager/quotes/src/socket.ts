import { SafeError } from '@benzinga/safe-await';
import {
  ListenableSubscribable,
  SubscribableReconnectingSocket,
  SubscribableReconnectingSocketEvent,
  Subscription,
} from '@benzinga/subscribable';
import { StockSymbol } from '@benzinga/session';
import { Session } from '@benzinga/session';
import { AuthenticationManager } from '@benzinga/session';

import { InitialQuote, IncomingQuote, QuoteDetail, Security } from './entities';
import { QuoteSession } from './session';
import { QuotesEnvironment } from './environment';

export interface NewQuoteEvent {
  quote: IncomingQuote;
  type: 'quote:quote';
}

export interface InitialQuoteEvent {
  detail: QuoteDetail;
  quote: IncomingQuote;
  symbol: StockSymbol;
  type: 'quote:initial_quote';
}

export interface InitialDetailQuoteEvent {
  detail: QuoteDetail;
  symbol: StockSymbol;
  type: 'quote:initial_detail_quote';
}

export interface QuoteSocketErrorEvent {
  error: SafeError;
  errorType: 'quote:quote_socket_requires_you_to_be_logged_in';
  type: 'error';
}

export interface QuoteSocketReconnectEvent {
  type: 'reconnected';
}

export type QuoteSocketEvent =
  | NewQuoteEvent
  | InitialQuoteEvent
  | InitialDetailQuoteEvent
  | QuoteSocketErrorEvent
  | QuoteSocketReconnectEvent;

export class QuoteSocket extends ListenableSubscribable<QuoteSocketEvent> {
  private socket?: SubscribableReconnectingSocket<string>;
  private socketSubscription?: Subscription<SubscribableReconnectingSocket<string>>;
  private isAuthorized = false;
  private session: Session;
  private securityQueue: Security[] = [];
  private securityJoinQueue: Security[] = [];
  private numberOfSubbedSecurity = 0;
  private securityDeleteList = new Map<Security, Date>();
  private authSubscription?: Subscription<AuthenticationManager>;

  constructor(session: Session) {
    super();
    this.session = session;
  }

  public createSession = (securities: Security): QuoteSession => {
    return new QuoteSession(this, securities);
  };

  public authorizeSession = (): void => {
    const authKey = this.session.getManager(AuthenticationManager).getBenzingaToken() ?? '';
    if (authKey === '') {
      this.call({
        error: new SafeError('quotes requires you to be logged in to work', 'quotes_error'),
        errorType: 'quote:quote_socket_requires_you_to_be_logged_in',
        type: 'error',
      });
    } else {
      this.getSocket().sendObject<Request>({
        data: [{ authKey }],
        name: 'auth',
        type: 1,
      });
    }
  };

  public startSession = (session: QuoteSession): void => {
    const security = session.getSecurity();
    if (this.getSocket().getState() === 'closed') {
      this.open();
    }
    if (!this.isAuthorized) {
      this.securityQueue.push(security);
    } else {
      this.joinSecurities([security]);
    }
  };

  public endSession = (session: QuoteSession): void => {
    const security = session.getSecurity();
    if (!this.isAuthorized) {
      this.securityQueue.filter(sec => sec !== security);
    } else {
      this.leaveSecurities([security]);
    }
  };

  public close = (): void => this.stop();

  private getSocket = () => {
    if (!this.socket) {
      this.socket = new SubscribableReconnectingSocket(this.session.getEnvironment(QuotesEnvironment).socketUrl);
    }
    return this.socket;
  };

  private joinSecurities = (securities: Security[]): void => {
    this.numberOfSubbedSecurity += securities.length;
    // delete returns true if the item is in there. hence if it is we simply want to remove it from the list and not join it
    const securitiesToAdd = securities.filter(security => !this.securityDeleteList.delete(security));
    this.securityJoinQueue = [...this.securityJoinQueue, ...securitiesToAdd];
    // we want to bulk join securities. to do this we simply use the javascript event loop.
    setTimeout(() => {
      if (this.securityJoinQueue?.length) {
        this.getSocket().sendObject<Request>({
          ack: 0,
          data: [this.securityJoinQueue],
          name: 'join',
          type: 1,
        });
        this.securityJoinQueue = [];
      }
    }, 0);
  };

  private leaveSecurities = (securities: Security[]): void => {
    this.numberOfSubbedSecurity -= securities.length;
    securities.forEach(security => this.securityDeleteList.set(security, new Date()));
    // we dont want to delete right away we want to debounce since joining and leaving is an expensive operation on the backend.
    setTimeout(() => {
      // we want to bulk leave securities.
      const securitiesToDelete = Array.from(this.securityDeleteList.entries())
        .filter(([security, date]) => {
          if (date && Date.now() - date.getTime() > 4000) {
            this.securityDeleteList.delete(security);
            return true;
          }
          return false;
        })
        .map(([security]) => security);
      if (securitiesToDelete.length) {
        this.getSocket().sendObject<Request>({
          ack: 0,
          data: [securitiesToDelete],
          name: 'leave',
          type: 1,
        });
      }
      if (this.numberOfSubbedSecurity === 0 && this.securityDeleteList.size === 0) {
        this.stop();
      }
    }, 5000);
  };

  private stop = (): void => {
    this.isAuthorized = false;
    this.getSocket().close();
    this.socketSubscription?.unsubscribe();
    this.socketSubscription = undefined;
    this.authSubscription?.unsubscribe();
    this.authSubscription = undefined;
  };

  private open = (): void => {
    if (this.hasSubscribers()) {
      const authenticationManager = this.session.getManager(AuthenticationManager);
      if (this.authSubscription === undefined) {
        this.authSubscription = authenticationManager.subscribe(event => {
          switch (event.type) {
            case 'authentication:session_token_update':
              if (event.token === undefined) {
                this.getSocket().close();
              } else {
                this.getSocket().reconnect();
              }
              break;
          }
        });
      }
      const authKey = authenticationManager.getBenzingaToken();
      if (authKey === undefined) {
        this.call({
          error: new SafeError('quotes requires you to be logged in to work', 'quotes_error'),
          errorType: 'quote:quote_socket_requires_you_to_be_logged_in',
          type: 'error',
        });
        return;
      }
      if (this.socketSubscription === undefined) {
        this.socketSubscription = this.getSocket().subscribe(this.onMessage);
      }
      this.getSocket().open();
    } else {
      this.stop();
    }
  };

  private onMessage = (event: SubscribableReconnectingSocketEvent<string>): void => {
    switch (event.type) {
      case 'response': {
        const msg: Response = JSON.parse(event.msg);
        switch (msg.type) {
          case 3:
            this.getSocket().sendObject<Request>({ type: 4 });
            break;
          case 1:
            switch (msg.name) {
              case 'initialQuote':
                (msg.data ?? []).forEach(quote => {
                  if (quote.quote) {
                    this.call({
                      detail: quote.detail,
                      quote: quote.quote,
                      symbol: quote.symbol,
                      type: 'quote:initial_quote',
                    });
                  } else {
                    this.call({
                      detail: quote.detail,
                      symbol: quote.symbol,
                      type: 'quote:initial_detail_quote',
                    });
                  }
                });
                break;
              case 'quote':
                (msg.data ?? []).forEach(quote => {
                  this.call({ quote: quote, type: 'quote:quote' });
                });
                break;
              case 'connected':
                this.authorizeSession();
                break;
              case 'auth':
                this.isAuthorized = true;
                this.joinSecurities(this.securityQueue);
                this.securityQueue = [];
                break;
            }
            break;
        }
        break;
      }
      case 'reconnected':
        this.securityQueue = [];
        this.isAuthorized = false;
        this.call({ type: 'reconnected' });
        break;
    }
  };
}

interface JoinLeaveRequest {
  ack: 0;
  data: Security[][];
  name: 'join' | 'leave';
  type: 1;
}

interface AuthRequest {
  data: { authKey: string }[];
  name: 'auth';
  type: 1;
}

interface PongRequest {
  type: 4;
}

type Request = PongRequest | JoinLeaveRequest | AuthRequest;

interface InitialQuoteResponse {
  data: InitialQuote[];
  name: 'initialQuote';
  type: 1;
}

interface QuoteResponse {
  data: IncomingQuote[];
  name: 'quote';
  type: 1;
}

interface AuthResponse {
  name: 'auth';
  type: 1;
}

interface ConnectedResponse {
  name: 'connected';
  type: 1;
}

interface PingResponse {
  type: 3;
}

type Response = PingResponse | InitialQuoteResponse | QuoteResponse | AuthResponse | ConnectedResponse;
