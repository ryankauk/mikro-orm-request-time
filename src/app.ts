import { logger } from './api/logger';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import * as db from './db';
import { routes } from './routes';
const { log } = logger('core')('express');
const app = express();

export const start = async () => {
  log('starting...');
  await db.init({ clientUrl: process.env.MONGO_CONNECTION_STRING! });
  routes(app);
  await new Promise((resolve) => {
    app.listen(5999, () => {
      log('listening on http://localhost:5999');
      resolve(undefined);
    });
  });
};
