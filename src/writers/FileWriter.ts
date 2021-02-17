import fs from 'fs';
import path from 'path';
import { ILoggerBuilderProps, IMessageParams, IWriter } from '../types';
import { MessageAsString } from '../utils';

export class FileWriter implements IWriter {
  private stream: fs.WriteStream;

  constructor(private _props: ILoggerBuilderProps) {
    this.stream = this.buildStream();
    this.stream.write('\n');
  }

  async log(params: IMessageParams, props: ILoggerBuilderProps) {
    const message = MessageAsString(params, props);
    this.stream.write(message);
    this.stream.write('\n');
  }

  private buildStream = () => {
    const { filePath = process.cwd() } = this._props;
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });

    const logPath = path.resolve(filePath, '.log');
    const props = { encoding: 'utf8', flags: 'a+', mode: 666 };

    return fs.createWriteStream(logPath, props);
  };
}
