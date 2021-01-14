import { Environment, Platform, Writer } from '../enums';
import { ILoggerParams } from './ILoggerParams';

export interface ILoggerBuilderProps extends ILoggerParams {
  writers?: Writer[];
  serviceName?: string;
  serviceVersion?: string;
  plataform?: Platform;
  environment?: Environment;
}
