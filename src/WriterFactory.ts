import { IWriter, Writer } from './types';
import { ConsoleWriter } from './writers';

export class WriterFactory {
  public static getWriter = (writer: Writer): IWriter => {
    const writers = {
      [Writer.CONSOLE]: ConsoleWriter,
    };

    return new writers[writer]();
  };
}
