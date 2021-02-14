import { IWriter, Writer } from '../types';
import { ConsoleWriter } from './';

export class Factory {
  public static getWriter = (writer: Writer): IWriter => {
    const writers = {
      [Writer.CONSOLE]: ConsoleWriter,
    };

    return new writers[writer]();
  };
}
