import { Controller, Post, UseGuards, Get } from '@nestjs/common';
import {
  ApiOperation, ApiTags, ApiCreatedResponse, ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserMeta } from '../common/decorators/user_meta.decorator';
import { LocalInterface } from './interfaces/login.interface';
import { GitHubInterface } from './interfaces/login.interface';
import { LocalGuard } from './guards/local.guard';
import { GitHubGuard } from './guards/github.guard';
import { IToken } from './interfaces/token.interface';
import { PlainCredentials } from './dto/plain_credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Plain login' })
  @ApiBody({
		description: 'User\'s credentials',
		type: PlainCredentials,
  })
  @ApiCreatedResponse({ description: 'App access token', type: IToken })
  @UseGuards(LocalGuard)
  async login(@UserMeta() user: LocalInterface): Promise<IToken> {
    return this.authService.login(user);
  }

  @UseGuards(GitHubGuard)
  @Get('github')
  gitHubLogin(): undefined {
    return;
  }

  @UseGuards(GitHubGuard)
  @Get('github/callback')
  async gitHubCallback(@UserMeta() meta: GitHubInterface): Promise<IToken> {
    let user = await this.usersService.findOne(meta.username);

    if (!user) {
      user = await this.usersService.create(meta);
    }

    return this.authService.login(user);
  }
}
