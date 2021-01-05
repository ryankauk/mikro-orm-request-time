import { Request, Response } from 'express';
import Router from 'express-promise-router';

import { DB_DI } from '../db';

const router = Router();

router.get('/mikro-orm', async (req: Request, res: Response) => {
  // const date = Date.now();
  await DB_DI.repos.myEntity.findOne({ _id: { $ne: null } });
  res.json({ result: { success: true } });
  // console.log(Date.now() - date);
});
router.get('/mongoose', async (req: Request, res: Response) => {
  // const date = Date.now();

  try {
    await DB_DI.mongoose.entities.myEntity.findOne({ _id: { $ne: null } });
  } catch (e) {
    console.error(e);
  }
  // await DB_DI.mongoose.entities.Kitten.findOne({ _id: { $ne: null } });
  res.json({ result: { success: true } });

  // console.log(Date.now() - date);
});
export const MyEntityController = router;
