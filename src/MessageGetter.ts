import { ILoggerBuilderProps, IMessageParams } from './types';

export const MessageGetter = (messageParams: IMessageParams, props: ILoggerBuilderProps): string => {
  const profile = getProfile(props);
  const { message, interUseCase, useCase, logLevel } = { ...props, ...messageParams };
  const logInfos = [];

  profile && logInfos.push(`[${profile}]`);
  useCase && logInfos.push(`[${[useCase]}]`);
  interUseCase && logInfos.push(`[${[interUseCase]}]`);

  const logInfosString = logInfos.filter(Boolean).join('');

  return [logInfosString, `[${logLevel}] ${message}`].join(' - ');
};

const getProfile = (props: ILoggerBuilderProps) => {
  const { serviceName, serviceVersion } = props;

  if (!serviceName) return;
  return serviceVersion ? `${serviceName}@${serviceVersion}` : serviceName;
};
