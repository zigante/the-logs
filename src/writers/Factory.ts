import { ILoggerBuilderProps, IWriter, Writer } from '../types';
import { ConsoleWriter, FileWriter } from './';

export class Factory {
  public static getWriter = (writer: Writer, props: ILoggerBuilderProps): IWriter => {
    const writers = {
      [Writer.CONSOLE]: ConsoleWriter,
      [Writer.FILE]: FileWriter,
    };

    return new writers[writer](props);
  };
}
