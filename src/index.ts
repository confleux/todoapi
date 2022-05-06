import express from 'express';
import config from 'config';

const app = express();

const port = config.get("port") as number;
const host = config.get("host") as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  console.log(`App listening on port: ${port}`);
});