import { MyEntity, MyEntityTwo } from '../db/entities';
import { Request, Response } from 'express';
import Router from 'express-promise-router';

import { DB_DI } from '../db';

const router = Router();

router.get('/mikro-orm', async (req: Request, res: Response) => {
  // const date = Date.now();
  const result = await DB_DI.repos.myEntity.findOne({ _id: { $ne: null } });
  res.json({ result: result });
  // console.log(Date.now() - date);
});
router.get('/mongoose', async (req: Request, res: Response) => {
  // const date = Date.now();

  const result = await DB_DI.mongoose.entities.myEntity.findOne({});

  // await DB_DI.mongoose.entities.Kitten.findOne({ _id: { $ne: null } });
  res.json({ result: result });

  // console.log(Date.now() - date);
});
router.get('/mikro-create', async (req, res) => {
  const data = new MyEntity();
  data.test = 'me';
  const withRelattion = new MyEntityTwo();
  withRelattion.entity = data.toReference();

  DB_DI.orm.em.persist(data);
  await DB_DI.repos.myEntity.nativeDelete({});
  // await DB_DI.repos.myEntity.persistAndFlush(data);
  await DB_DI.repos.myEntityTwo.nativeDelete({});
  DB_DI.orm.em.persist(withRelattion);
  await DB_DI.orm.em.flush();
  DB_DI.orm.em.clear();
  const datas = await DB_DI.repos.myEntityTwo.findAll({});
  console.log(datas);
  res.json({});
});
export const MyEntityController = router;
