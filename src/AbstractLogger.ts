import * as Types from './types';
import { Factory as WriterFactory } from './writers';

export class AbstractLogger implements Types.ILogger {
  private _writers = new Set<Types.IWriter>();
  private _level: number;
  private _configs: Types.ILoggerParams;
  private _temporaryConfigs: Types.ILoggerParams = {};
  tracking: string[] = [];

  constructor(private _props: Types.ILoggerBuilderProps) {
    const { logLevel = Types.LogLevel.Debug, writers = [Types.Writer.CONSOLE], interUseCase, useCase } = _props;
    this._configs = { interUseCase, logLevel, useCase };

    this._level = Types.LogLevelNumber[logLevel];
    writers.forEach(writer => {
      const writerInstance = WriterFactory.getWriter(writer, _props);
      this._writers.add(writerInstance);
    });
  }

  async debug(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const logLevel = Types.LogLevel.Debug;
    const props: Types.ILoggerBuilderProps = { ...this.getProps(), logLevel };

    if (this.allowLog(logLevel)) this._writers.forEach(writer => writer.log(message, props));
  }

  async notice(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const logLevel = Types.LogLevel.Notice;
    const props: Types.ILoggerBuilderProps = { ...this.getProps(), logLevel };

    if (this.allowLog(logLevel)) this._writers.forEach(writer => writer.log(message, props));
  }

  async info(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const logLevel = Types.LogLevel.Info;
    const props: Types.ILoggerBuilderProps = { ...this.getProps(), logLevel };

    if (this.allowLog(logLevel)) this._writers.forEach(writer => writer.log(message, props));
  }

  async warning(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const logLevel = Types.LogLevel.Warning;
    const props: Types.ILoggerBuilderProps = { ...this.getProps(), logLevel };

    if (this.allowLog(logLevel)) this._writers.forEach(writer => writer.log(message, props));
  }

  async error(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const logLevel = Types.LogLevel.Error;
    const props: Types.ILoggerBuilderProps = { ...this.getProps(), logLevel };

    if (this.allowLog(logLevel)) this._writers.forEach(writer => writer.log(message, props));
  }

  async critical(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const logLevel = Types.LogLevel.Critical;
    const props: Types.ILoggerBuilderProps = { ...this.getProps(), logLevel };

    if (this.allowLog(logLevel)) this._writers.forEach(writer => writer.log(message, props));
  }

  private getMessage(params: string | Types.IMessageParams): Types.IMessageParams {
    const _params: Types.IMessageParams = typeof params === 'string' ? { message: params } : params;
    this.tracking.push(_params.message);

    return _params;
  }

  private allowLog = (level: Types.LogLevel) => {
    const innerConfigs = this._temporaryConfigs || this._configs;
    const innerLevel = innerConfigs.logLevel || Types.LogLevel.Debug;
    return (Types.LogLevelNumber[innerLevel] ?? this._level) <= Types.LogLevelNumber[level];
  };

  private getProps = (): Types.ILoggerBuilderProps => ({ ...this._props, ...this._temporaryConfigs });

  setConfigs = (params: Types.ILoggerParams = {}) => (this._temporaryConfigs = { ...this._configs, ...params });
}
