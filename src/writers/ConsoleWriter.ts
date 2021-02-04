import chalk from 'chalk';
import { MessageGetter } from '../MessageGetter';
import { ILoggerBuilderProps, IMessageParams, IWriter, LogLevel } from '../types';

export class ConsoleWriter implements IWriter {
  async log(params: IMessageParams, props: ILoggerBuilderProps) {
    const { logLevel = LogLevel.Debug } = props;
    const color = this._colorByLevel[logLevel];
    const message = MessageGetter(params, props);

    console.log(color(message));
  }

  private _colorByLevel: Record<LogLevel, chalk.Chalk> = {
    [LogLevel.Debug]: chalk.yellowBright,
    [LogLevel.Info]: chalk.blueBright,
    [LogLevel.Notice]: chalk.greenBright,
    [LogLevel.Warning]: chalk.yellow,
    [LogLevel.Error]: chalk.red,
    [LogLevel.Critical]: chalk.bgRed,
  };
}
