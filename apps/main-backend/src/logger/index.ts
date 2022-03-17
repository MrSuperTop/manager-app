import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  name: 'main',
  transport: {
    target: 'pino-pretty'
  },
  base: {
    pid: false
  },
  timestamp: () => {
    const time = dayjs().format();

    return `,"time":"${time}"`;
  }
});

log.info('Logger Created');

export default log;
