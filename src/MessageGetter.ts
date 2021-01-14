import { ILoggerBuilderProps, IMessageParams } from './types';

// Refactor method
export const MessageGetter = (messageParams: IMessageParams, props: ILoggerBuilderProps): string => {
  const profile = getProfile(props);

  return messageFromParams(messageParams, props, profile);
};

const getProfile = (props: ILoggerBuilderProps) => {
  const { serviceName, serviceVersion } = props;

  if (!serviceName) return;
  return serviceVersion ? `${serviceName}@${serviceVersion}` : serviceName;
};

const messageFromParams = (messageParams: IMessageParams, params: ILoggerBuilderProps, profile?: string) => {
  const configs = { ...params, ...messageParams };
  const { message, interUseCase, useCase, logLevel } = configs;
  let infos = [];

  if (profile) infos.push(`[${profile}]`);
  if (interUseCase || useCase) infos.push(`[${[useCase, interUseCase].filter(Boolean).join(' - ')}]`);

  const infosString = infos.filter(Boolean).join('');
  infos = [];
  infos.push(infosString, `[${logLevel}]`, message);

  return infos.join(' - ');
};
