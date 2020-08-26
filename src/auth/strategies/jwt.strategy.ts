import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { MetaInterface } from '../interfaces/meta.interface';
import { JwtPayload } from '../interfaces/jwtPayload.interface';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: JwtPayload): MetaInterface {
    return {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };
  }
}
