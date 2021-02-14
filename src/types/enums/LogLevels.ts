export const enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Notice = 'notice',
  Warning = 'warning',
  Error = 'error',
  Critical = 'critical',
}

export const LogLevelNumber: Record<LogLevel, number> = {
  [LogLevel.Debug]: 0,
  [LogLevel.Info]: 1,
  [LogLevel.Notice]: 2,
  [LogLevel.Warning]: 3,
  [LogLevel.Error]: 4,
  [LogLevel.Critical]: 5,
};
