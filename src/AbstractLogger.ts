import * as Types from './types';
import { WriterFactory } from './WriterFactory';

// Refactor method
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
      const writerInstance = WriterFactory.getWriter(writer);
      this._writers.add(writerInstance);
    });
  }

  async debug(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const level = Types.LogLevel.Debug;
    const props: Types.ILoggerBuilderProps = {
      ...this._props,
      ...this._temporaryConfigs,
      logLevel: Types.LogLevel.Debug,
    };

    if (this.allowLog(level)) this._writers.forEach(writer => writer.log(message, props));
  }

  async notice(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const level = Types.LogLevel.Notice;
    const props: Types.ILoggerBuilderProps = {
      ...this._props,
      ...this._temporaryConfigs,
      logLevel: Types.LogLevel.Notice,
    };

    if (this.allowLog(level)) this._writers.forEach(writer => writer.log(message, props));
  }

  async info(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const level = Types.LogLevel.Info;
    const props: Types.ILoggerBuilderProps = {
      ...this._props,
      ...this._temporaryConfigs,
      logLevel: Types.LogLevel.Info,
    };

    if (this.allowLog(level)) this._writers.forEach(writer => writer.log(message, props));
  }

  async warning(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const level = Types.LogLevel.Warning;
    const props: Types.ILoggerBuilderProps = {
      ...this._props,
      ...this._temporaryConfigs,
      logLevel: Types.LogLevel.Warning,
    };

    if (this.allowLog(level)) this._writers.forEach(writer => writer.log(message, props));
    Types.LogLevel.Warning;
  }

  async error(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const level = Types.LogLevel.Error;
    const props: Types.ILoggerBuilderProps = {
      ...this._props,
      ...this._temporaryConfigs,
      logLevel: Types.LogLevel.Error,
    };

    if (this.allowLog(level)) this._writers.forEach(writer => writer.log(message, props));
  }

  async critical(params: string | Types.IMessageParams): Promise<void> {
    const message = this.getMessage(params);
    const level = Types.LogLevel.Critical;
    const props: Types.ILoggerBuilderProps = {
      ...this._props,
      ...this._temporaryConfigs,
      logLevel: Types.LogLevel.Critical,
    };

    if (this.allowLog(level)) this._writers.forEach(writer => writer.log(message, props));
    Types.LogLevel.Critical;
  }

  private getMessage(params: string | Types.IMessageParams): Types.IMessageParams {
    const _params: Types.IMessageParams = typeof params === 'string' ? { message: params } : params;
    this.tracking.push(_params.message);
    return _params;
  }

  private allowLog = (level: Types.LogLevel) =>
    (Types.LogLevelNumber[(this._temporaryConfigs || this._configs).logLevel || Types.LogLevel.Debug] ?? this._level) <=
    Types.LogLevelNumber[level];

  setConfigs = (params?: Types.ILoggerParams) => (this._temporaryConfigs = { ...this._configs, ...(params || {}) });
}
