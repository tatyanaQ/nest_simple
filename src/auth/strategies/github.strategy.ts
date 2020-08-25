import { Strategy } from 'passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';

import { providers } from '../../common/constants';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(providers.CONFIG) configService) {
    super({
      clientID: configService.GITHUB_CLIENT_ID,
      clientSecret: configService.GITHUB_CLIENT_SECRET,
    });
  }

  async validate(accessToken, refreshToken, profile) {
    return {
      id: profile.id,
      username: profile.username,
    };
  }
}
