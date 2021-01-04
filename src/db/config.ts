import { Options } from '@mikro-orm/core';

import { EntityManager, MongoDriver } from '@mikro-orm/mongodb';
import { MyEntity } from './entities';
import { AsyncLocalStorage } from 'async_hooks';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
export const storage = new AsyncLocalStorage<EntityManager>();
export const config = (clientUrl: string): Options<MongoDriver> => ({
  entities: [MyEntity],
  type: 'mongo', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  clientUrl,
  context: () => storage.getStore(),
  highlighter: new MongoHighlighter(),
  debug: true,
});
