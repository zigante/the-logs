import { ILoggerParams } from './ILoggerParams';
import { IMessageParams } from './IMessageParams';

export interface ILogger {
  debug: (message: string | IMessageParams) => Promise<void>;
  notice: (message: string | IMessageParams) => Promise<void>;
  info: (message: string | IMessageParams) => Promise<void>;
  warning: (message: string | IMessageParams) => Promise<void>;
  error: (message: string | IMessageParams) => Promise<void>;
  critical: (message: string | IMessageParams) => Promise<void>;
  setConfigs: (params?: ILoggerParams) => void;
  tracking: string[];
}
