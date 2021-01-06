import { Options } from '@mikro-orm/core';

import { EntityManager, MongoDriver } from '@mikro-orm/mongodb';
import { MyEntity, MyEntityTwo } from './entities';
// import { AsyncLocalStorage } from 'async_hooks';
// export const storage = new AsyncLocalStorage<EntityManager>();
export const config = (clientUrl: string): Options<MongoDriver> => ({
  entities: [MyEntity, MyEntityTwo],
  type: 'mongo', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  clientUrl,
  // context: () => storage.getStore(),
});
