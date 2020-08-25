import { Controller, Post, UseGuards, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Meta } from '../common/decorators/meta.decorator';
import { MetaInterface } from './interfaces/meta.interface'
import { LocalGuard } from './guards/local.guard';
import { GitHubGuard } from './guards/github.guard';
import { IToken } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Meta() meta: MetaInterface): Promise<IToken> {
    return this.authService.login(meta);
  }

  @UseGuards(GitHubGuard)
  @Get('github')
  gitHubLogin(): undefined {
    return;
  }

  @UseGuards(GitHubGuard)
  @Get('github/callback')
  async gitHubCallback(@Meta() meta: MetaInterface): Promise<IToken> {
    let user = await this.usersService.findOne(meta.username);

    if (!user) {
      user = await this.usersService.create(meta);
    }

    return this.authService.login(user);
  }
}
