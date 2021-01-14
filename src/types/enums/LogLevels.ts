export const enum LogLevel {
  Debug = 'Debug',
  Info = 'Info',
  Notice = 'Notice',
  Warning = 'Warning',
  Error = 'Error',
  Critical = 'Critical',
}

export const LogLevelNumber: Record<LogLevel, number> = {
  [LogLevel.Debug]: 0,
  [LogLevel.Info]: 1,
  [LogLevel.Notice]: 2,
  [LogLevel.Warning]: 3,
  [LogLevel.Error]: 4,
  [LogLevel.Critical]: 5,
};
