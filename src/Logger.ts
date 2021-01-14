import { AbstractLogger } from './AbstractLogger';
import { ILogger, ILoggerBuilderProps, ILoggerParams } from './types';

export class Logger {
  private static _instance: ILogger;

  public static buildLogger = (configs: ILoggerBuilderProps = {}): Logger => new Logger(configs);
  public static buildLoggerAsync = (configs: ILoggerBuilderProps = {}): Promise<Logger> =>
    Promise.resolve(Logger.buildLogger(configs));

  public static getLogger = (params: ILoggerParams = {}): Omit<ILogger, 'setConfigs'> => {
    if (!Logger._instance) Logger.buildLogger();
    const instance = Logger._instance;
    instance.setConfigs(params || {});
    return instance;
  };
  public static getLoggerAsync = (params: ILoggerParams = {}): Promise<Omit<ILogger, 'setConfigs'>> => {
    return Promise.resolve(Logger.getLogger(params));
  };

  private constructor(configs: ILoggerBuilderProps = {}) {
    Logger._instance = new AbstractLogger(configs);
    return this;
  }
}
