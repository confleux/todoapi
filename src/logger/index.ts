import pino from 'pino';
import dayjs from 'dayjs';
import pretty from 'pino-pretty';

const log = pino(
  pretty({
    colorize: true,
    translateTime: true
  })
);

export default log;