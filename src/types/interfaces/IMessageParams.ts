import { ILoggerParams } from './ILoggerParams';

export interface IMessageParams extends Omit<ILoggerParams, 'logLevel'> {
  message: string;
  extra?: Record<string, any>; //eslint-disable-line
}
