import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwtPayload.interface'
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
      const { id, username, role } = user;
      return { id, username, role };
    }
    return null;
  }

  async login({ id, username, role }: JwtPayload): Promise<IToken> {
    const payload = { id, username, role };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
