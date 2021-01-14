import { ILoggerBuilderProps } from './ILoggerBuilderProps';
import { IMessageParams } from './IMessageParams';

export interface IWriter {
  log(params: IMessageParams, props: ILoggerBuilderProps): Promise<void>;
}
