# The Logs

Stop using `console.log` and use this simple logs API at your daily proccess

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

### Instalation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install --save the-logs
```

### Usage

```ts
// First of all, you should create a instance of the logger
// This code goes before your application entry point

import { Logger, LogLevel } from 'the-logs';
import { version as serviceVersion, name as serviceName } from '../package.json';

Logger.buildLogger({
  serviceName,
  serviceVersion,
  logLevel: LogLevel.Debug,
  environment: process.env.NODE_ENV,
  useCase: 'My example',
});
```

```ts
// This code goes in any file of your project
// Creates your logger object

let logger = Logger.getLogger({ interUseCase: 'First logs wave' });
logger.debug('This is a debug log'); // [servce-name@1.0.0][My example][First logs wave] - [Debug] This is a debug log
logger.info('This is an info log'); // [servce-name@1.0.0][My example][First logs wave] - [Info] This is an info log
logger.error('This is an error log'); // [servce-name@1.0.0][My example][First logs wave] - [Error] This is an error log

// Updates your logger with other log level
logger = Logger.getLogger({ interUseCase: 'Second logs wave', logLevel: LogLevel.Error });
logger.debug('This is a debug log'); //
logger.info('This is an info log'); //
logger.error('This is an error log'); // [servce-name@1.0.0][My example][Second logs wave] - [Error] This is an error log

// Updates your logger with other log level
logger = Logger.getLogger({ interUseCase: 'Last logs wave', logLevel: LogLevel.Critical });
logger.debug('This is a debug log'); //
logger.info('This is an info log'); //
logger.error('This is an error log'); //
```

### Features

- [x] Log at console
- [x] Refactor and use Singleton pattern
- [x] Add multiple configs to track logs beetwen process
- [ ] Create platform to display logs
- [ ] Create metrics using logs
- [ ] Create custom metrics
- [ ] Add metrics to platform
- [ ] Use notifications

### Configs

| LogLevel |     | Environment |     | Platform   |     | Writers |
| -------- | --- | ----------- | --- | ---------- | --- | ------- |
| Debug    |     | Beta        |     | Serverless |     | Console |
| Info     |     | Development |     | Lambda     |     | -       |
| Notice   |     | Production  |     | Container  |     | -       |
| Warning  |     | Stable      |     | Docker     |     | -       |
| Error    |     | Staging     |     | VM         |     | -       |
| Critical |     | Testing     |     | Instance   |     | -       |

### LogLevel Hierarchy

##### Log levels below the configured level won't be logged

Critical > Error > Warning > Notice > Info > Debug

[npm-image]: https://img.shields.io/npm/v/the-logs
[npm-url]: https://npmjs.org/package/the-logs
[downloads-image]: https://img.shields.io/npm/dm/the-logs.svg
[downloads-url]: https://npmcharts.com/compare/the-logs?minimal=true
