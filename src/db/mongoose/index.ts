import { coreLogger } from '../../core';
const { log } = coreLogger('mongoose');
import mongoose from 'mongoose';
const myEntity = mongoose.model(
  'my-entity',
  new mongoose.Schema({
    name: String,
  })
);
export const DI = {
  entities: {
    myEntity,
  },
};

export const start = async () => {
  const started = log.diff('intializing');

  // mongoose.set('debug', true);
  await mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  started();
};

export const close = () => {
  return mongoose.connection.close();
};
