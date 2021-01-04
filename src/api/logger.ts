import c from 'ansi-colors';
import { systemConfig } from './config';

type AllowedDataTypes = Array<any> | string;
const loggerRescursive = (name: string) => {
  //   if (!systemConfig.logs) return undefined;
  const newLogger = (newName: string) => loggerRescursive(`${name}::${c.cyan.dim(newName)}`);
  const log = (info: string, data?: Array<any> | string) => {
    const text = {
      _text: `${name}// ${info}`,
      add(newString: string) {
        text._text = `${text._text} ${newString}`;
      },
    };
    if (data) {
      if (Array.isArray(data)) {
        text.add(data.map((dataObj) => dataObj.constructor.name).join(', '));
        //   console.log(`${name} // ${info}`);
      } else if (typeof data === 'string') {
        text.add(c.magenta(data));
      } else {
        text.add(c.magenta(`[ ${Object.keys(data).join(', ')} ]`));
      }
    }
    if (systemConfig.logs) console.log(text._text);
  };
  log.diff = (info: string, data?: AllowedDataTypes) => {
    const dateStarted = Date.now();
    log(`${info} started...`, data);
    return (returnData?: AllowedDataTypes) => {
      log(`${info} ${c.bgCyan(c.black(`[took ${Date.now() - dateStarted}ms]`))}`, returnData);
    };
  };
  newLogger.log = log;
  return newLogger;
};

export const logger = (name: string) => {
  const baseName = c.cyan(`[${name}]`);
  return loggerRescursive(baseName);
};
