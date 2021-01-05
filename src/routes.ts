import { RequestContext } from '@mikro-orm/core';
import express, { Express } from 'express';
import * as db from './db';
import { MyEntityController } from './controllers/myModel.controller';
import { storage } from './db/config';
export const routes = (app: Express) => {
  app.use(express.json());
  app.use((req, res, next) => {
    storage.run(db.DB_DI.orm.em.fork(true, true), next);
  });
  // app.use((req, res, next) => RequestContext.create(db.DB_DI.orm.em, next));
  app.get('/', (req, res) =>
    res.json({
      message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!',
    })
  );
  app.use('/myEntity', MyEntityController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));
  app.use(function (err, req, res, next) {
    // logic
    console.error(err);
  });
};
