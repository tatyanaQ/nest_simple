import { Strategy } from 'passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';

import { providers } from '../../common/constants';
import { GitHubInterface } from '../interfaces/login.interface';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(providers.CONFIG) configService) {
    super({
      clientID: configService.GITHUB_CLIENT_ID,
      clientSecret: configService.GITHUB_CLIENT_SECRET,
    });
  }

  validate(accessToken, refreshToken, profile): GitHubInterface {
    return {
      username: profile.username,
    };
  }
}
