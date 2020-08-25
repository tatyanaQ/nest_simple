import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { MetaInterface } from './interfaces/meta.interface'
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: MetaInterface): Promise<IToken> {
    const payload = { username: user.username, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
