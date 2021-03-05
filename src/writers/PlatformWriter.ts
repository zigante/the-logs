import axios from 'axios';

import { ILoggerBuilderProps, IMessageParams, IWriter, LogLevel } from '../types';

export class PlatformWriter implements IWriter {
  async log(params: IMessageParams, props: ILoggerBuilderProps) {
    const { logLevel = LogLevel.Debug } = props;
    const endpoint = this._endpointByLevel[logLevel];
    const body = { ...props, ...params };

    axios.post(endpoint, { method: 'POST', body, headers: { 'The-Logs-X': 'my-context-uuid' } }).catch(console.log);
  }

  private _endpointByLevel: Record<LogLevel, string> = {
    [LogLevel.Debug]: 'https://gmboylesi2.execute-api.us-east-1.amazonaws.com/prd/debug',
    [LogLevel.Info]: 'https://gmboylesi2.execute-api.us-east-1.amazonaws.com/prd/info',
    [LogLevel.Notice]: 'https://gmboylesi2.execute-api.us-east-1.amazonaws.com/prd/notice',
    [LogLevel.Warning]: 'https://gmboylesi2.execute-api.us-east-1.amazonaws.com/prd/warning',
    [LogLevel.Error]: 'https://gmboylesi2.execute-api.us-east-1.amazonaws.com/prd/error',
    [LogLevel.Critical]: 'https://gmboylesi2.execute-api.us-east-1.amazonaws.com/prd/critical',
  };
}
