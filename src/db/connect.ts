import mongoose from 'mongoose';
import config from 'config';
import log from '../logger';

const connect = async (): Promise<void> => {
  try {
    const dbUri: string = config.get("dbUri");
    await mongoose.connect(dbUri);
    log.info("DB connected");
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.error("DB error", e.message);
      process.exit(1);
    }
  }
}

export default connect;