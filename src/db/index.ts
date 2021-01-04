import { MikroORM, RequestContext } from '@mikro-orm/core';
import { EntityManager, MongoDriver, MongoEntityRepository } from '@mikro-orm/mongodb';

import { logger } from '../api/logger';
import { config } from './config';
import { MyEntity } from './entities';

const { log } = logger('core')('database');
export const DB_DI: {
  orm: MikroORM<MongoDriver>;
  repos: {
    myEntity: MongoEntityRepository<MyEntity>;
  };
} = { repos: {} } as any;
export function fork(next: (...args: any[]) => Promise<void>): Promise<void> {
  return RequestContext.createAsync(DB_DI.orm.em.fork(), next);
}
export async function forkAsync<T extends any>(next: () => Promise<T>) {
  let value;
  const getValue = async () => {
    value = next();
  };
  await fork(getValue);
  return value;
}
export type RTDatabaseOptions = { clientUrl: string };
export async function init({ clientUrl }: RTDatabaseOptions): Promise<void> {
  if (DB_DI.orm && (await DB_DI.orm.isConnected())) {
    if (process.env.NODE_ENV === 'production' && process.env.BABEL_DECORATORS_COMPAT) {
      throw Error(
        'Mikro orm requires BABEL_DECORATORS_COMPAT env variable during dev and build but will cause errors running after build.'
      );
    }
    // DB_DI.orm.em = DB_DI.orm.em.fork();
    // DB_DI.repos.tenant = DB_DI.orm.em.getRepository(Tenant);
    // DB_DI.repos.shortLink = DB_DI.orm.em.getRepository(ShortLink);
    // DB_DI.repos.client = DB_DI.orm.em.getRepository(Client);
    return;
  }
  if (DB_DI.orm && !(await DB_DI.orm.isConnected())) {
    await DB_DI.orm.connect();
    log('reconnected');
  }
  log('initializing...');

  DB_DI.orm = await MikroORM.init<MongoDriver>(config(clientUrl));
  DB_DI.repos.myEntity = DB_DI.orm.em.getRepository(MyEntity);
}

export function close() {
  return DB_DI.orm.close();
}
