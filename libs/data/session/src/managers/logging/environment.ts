import { Verbosity } from './entities';

export class LoggingEnvironment {
  public static getName = () => 'benzinga-utils-logging';
  public static getEnvironment = (env: Record<string, string>) => ({
    verbosity: (env.verbosity ?? 'info') as Verbosity,
  });
}
