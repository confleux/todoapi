import pino, { Logger } from "pino";
import pretty from "pino-pretty";

const log: Logger<pretty.PrettyStream> = pino(
  pretty({
    colorize: true,
    translateTime: true
  })
);

export default log;