import { safeAwait, safeResilient } from '@benzinga/safe-await';
import { ExtendedSubscribable, SubscribableEvent } from './subscribable';
interface SocketRequestEvent extends SubscribableEvent<'request'> {
  msg: string | ArrayBuffer | ArrayBufferView | Blob;
}

interface SocketResponseEvent<T> extends SubscribableEvent<'response'> {
  msg: T;
}

interface SocketErrorEvent extends SubscribableEvent<'error'> {
  errorEvent: Event;
}

interface SocketCloseEvent extends SubscribableEvent<'close'> {
  event: CloseEvent;
}

export type SubscribableSocketEvent<RESPFormat> =
  | SocketCloseEvent
  | SocketErrorEvent
  | SocketRequestEvent
  | SocketResponseEvent<RESPFormat>
  | SubscribableEvent<'open'>
  | SubscribableEvent<'closing'>;

export type SocketState = 'closed' | 'closing' | 'open' | 'opening';

interface SocketFunctions {
  close: SubscribableSocket['close'];
  open: SubscribableSocket['open'];
  send: SubscribableSocket['send'];
  sendObject: SubscribableSocket['sendObject'];
}

class SubscribableSocket<RESPFormat = unknown, REQFormat = unknown> extends ExtendedSubscribable<
  SubscribableSocketEvent<RESPFormat>,
  SocketFunctions
> {
  private socket?: WebSocket;
  private url: URL;
  private state: SocketState;
  private queueSend: (string | ArrayBuffer | ArrayBufferView | Blob)[] = [];
  private socketsOpened: WebSocket[] = [];

  constructor(url: URL) {
    super();
    this.url = url;
    this.state = 'closed';
  }

  public open = async (): Promise<void> => {
    if (this.socket === undefined && this.state !== 'opening') {
      this.state = 'opening';
      const socket = await safeResilient(
        () =>
          safeAwait<WebSocket>(
            new Promise(resolve => {
              const socket = new WebSocket(this.url.toString());
              this.socketsOpened.push(socket);
              socket.onopen = () => {
                if (this.state === 'opening') {
                  this.state = 'open';
                  this.dispatch({ type: 'open' });
                  resolve(socket);
                } else {
                  try {
                    socket.close();
                  } catch {
                    console.log('could not close socket');
                  }
                }
              };
              socket.onmessage = (event: MessageEvent) => {
                if (this.socket === socket) {
                  this.dispatch({ msg: event.data, type: 'response' });
                }
              };
              socket.onerror = (event: Event) => {
                if (this.socket === socket) {
                  this.dispatch({ errorEvent: event, type: 'error' });
                } else {
                  try {
                    socket.close();
                  } catch {
                    console.log('could not close socket');
                  }
                }
              };
              socket.onclose = (event: CloseEvent) => {
                if (this.socket === socket) {
                  this.state = 'closed';
                  this.dispatch({ event: event, type: 'close' });
                } else {
                  try {
                    socket.close();
                  } catch {
                    console.log('could not close socket');
                  }
                }
              };
            }),
          ),
        { delayOffset: 10000 },
      )();

      if (socket.ok) {
        this.socket = socket.ok;
        this.socketsOpened.forEach(s => (s !== this.socket ? s.close() : undefined));
        this.socketsOpened = [];
        this.queueSend.forEach(data => this.send(data));
        this.queueSend = [];
      }
    }
  };

  public close = (): void => {
    this.close_internal();
    this.queueSend = [];
  };

  public sendObject = <T = REQFormat>(data: T): void => {
    this.send(JSON.stringify(data));
  };

  public send = (data: string | ArrayBuffer | ArrayBufferView | Blob): void => {
    switch (this.state) {
      case 'opening':
        this.queueSend.push(data);
        break;
      case 'open':
        try {
          this.socket?.send(data);
        } catch (event) {
          this.dispatch({ errorEvent: event as Event, type: 'error' });
        }
        this.dispatch({ msg: data, type: 'request' });
        break;
      case 'closed':
        console.log('cannot send data if socket is not open');
        break;
    }
  };

  public getState = (): SocketState => this.state;

  protected close_internal = (): void => {
    if (this.socket) {
      try {
        if (this.state === 'open') {
          this.state = 'closing';
          this.dispatch({ type: 'closing' });
          this.socket.close();
        } else {
          const socket = this.socket;
          socket.onclose = null;
          socket.onerror = null;
          socket.onmessage = null;
          socket.onopen = () => {
            try {
              socket.close();
            } catch (event) {
              this.dispatch({ errorEvent: event as Event, type: 'error' });
            }
          };
        }
      } catch (event) {
        this.dispatch({ errorEvent: event as Event, type: 'error' });
      }
      this.socket = undefined;
    }
    this.state = 'closed';
  };

  protected onSubscribe = (): SocketFunctions => ({
    close: this.close,
    open: this.open,
    send: this.send,
    sendObject: this.sendObject,
  });

  protected onZeroSubscriptions = (): void => {
    this.close();
  };
}

export default SubscribableSocket;
