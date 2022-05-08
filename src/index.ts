import express from 'express';
import config from 'config';
import log from './logger';
import connect from './db/connect';
import routes from './routes'

const app = express();

const port = config.get("port") as number;
const host = config.get("host") as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, async () => {
  await connect();
  await routes(app);
  log.info(`App listening on port: ${port}`);
});