import { Request, Response } from 'express';
import Router from 'express-promise-router';

import { DB_DI } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const date = Date.now();
  const author = await DB_DI.repos.myEntity.findOne({ _id: { $ne: null } });
  res.json(author);
  console.log(Date.now() - date);
});

export const MyEntityController = router;
