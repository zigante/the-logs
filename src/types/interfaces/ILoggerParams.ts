import { LogLevel } from '../enums';

export interface ILoggerParams {
  logLevel?: LogLevel;
  useCase?: string;
  interUseCase?: string;
  filePath?: string;
}
