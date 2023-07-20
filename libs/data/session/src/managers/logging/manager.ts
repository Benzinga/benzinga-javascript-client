import { Subscribable, SubscribableEvent, SubscriberId } from '@benzinga/subscribable';
import { LoggingEnvironment } from './environment';
import { Verbosity } from './entities';
import { Session } from '../../session';
import { SafeError } from '@benzinga/safe-await';

const verbosities: Verbosity[] = ['error', 'warn', 'info', 'log', 'debug'];

interface LoggingVerbosityChanged {
  verbosity: Verbosity;
  type: 'utils-logging:verbosity_changed';
}

interface LoggingLogMessage {
  verbosity: Verbosity;
  category: string;
  message: string;
  data?: unknown;
  type: 'utils-logging:log_message';
}

export type LoggingManagerEvent = LoggingVerbosityChanged | LoggingLogMessage;

export class LoggingManager extends Subscribable<LoggingManagerEvent> {
  private verbosity: Verbosity = 'info';

  constructor(session: Session) {
    super();
    this.verbosity = session.getEnvironment(LoggingEnvironment).verbosity;
    Subscribable.setDebugLoggerCallback(
      (
        eventType: 'dispatch' | 'unsubscribe' | 'subscribe',
        subscribableName: string,
        eventOrId: SubscribableEvent<string> | SubscriberId,
      ) => {
        if (this.verbosity === 'debug') {
          this.log(this.verbosity, eventType, subscribableName, eventOrId);
        } else if (eventType === 'dispatch' && (eventOrId as SubscribableEvent<string>).type === 'error') {
          const event = eventOrId as {
            error?: SafeError;
            errorType?: string;
            type: 'error';
          };
          this.log('error', event.errorType ?? '', event?.error?.toString() ?? '', event?.error);
        }
      },
    );
  }

  public static getName = () => 'benzinga-utils-logging';

  public getVerbosity = (): Verbosity => this.verbosity;
  public setVerbosity = (verbosity: Verbosity) => {
    this.verbosity = verbosity;
    this.dispatch({
      type: 'utils-logging:verbosity_changed',
      verbosity,
    });
  };

  public log(verbosity: Verbosity, category: string, message: string, data?: unknown): void {
    if (verbosities.findIndex(v => v === this.verbosity) >= verbosities.findIndex(v => v === verbosity)) {
      console[verbosity](category, message, data);
    }

    this.dispatch({
      category,
      data,
      message,
      type: 'utils-logging:log_message',
      verbosity,
    });
  }
}
