import { Request, Response } from 'express';

import { MetaInterface } from '../interfaces/meta.interface';

interface UserRequest extends Request {
  user: MetaInterface;
}

export function logger(req: UserRequest, res: Response, next: Function) {
  console.log(`${req.method} ${req.url}`);
  if (req.body) console.log(req.body);

  next();
}