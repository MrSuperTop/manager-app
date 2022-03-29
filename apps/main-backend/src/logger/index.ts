import logger from 'pino';
import { isProd } from '../constants/isProd';

const extensions = isProd ? {} : {
  transport: {
    target: 'pino-pretty'
  },
  timestamp: () => {
    const time = new Date().toISOString();

    return `,"time":"${time}"`;
  }
};

const log = logger({
  name: 'main',
  base: {
    pid: false
  },
  ...extensions
});

log.info('Logger Created');

export default log;
