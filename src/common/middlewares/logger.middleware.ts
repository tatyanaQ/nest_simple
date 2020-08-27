import { Request, Response } from 'express';

import { MetaInterface } from '../../auth/interfaces/meta.interface';

interface UserRequest extends Request {
  user: MetaInterface;
}

export function logger(req: UserRequest, res: Response, next: Function) {
  console.log(`${req.method} ${req.url}`);
  if (Object.keys(req.body).length) console.log(req.body);

  next();
}
