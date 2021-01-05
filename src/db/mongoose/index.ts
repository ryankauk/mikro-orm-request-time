import { coreLogger } from '../../core';
const { log } = coreLogger('mongoose');
import mongoose from 'mongoose';
const myEntity = mongoose.model(
  'ApiKey',
  new mongoose.Schema({
    name: String,
  }),
  'apikeys'
);
export const DI = {
  entities: {
    myEntity,
  },
};

export const start = async (clientUrl: string) => {
  const started = log.diff('intializing');

  // mongoose.set('debug', true);
  await mongoose.connect(clientUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  started();
};

export const close = () => {
  return mongoose.connection.close();
};
