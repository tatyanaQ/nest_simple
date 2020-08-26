import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GitHubStrategy } from './strategies/github.strategy';
import { AuthController } from './auth.controller';
import configs from '../common/modules/configs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configs.JWT_SECRET,
      signOptions: { expiresIn: configs.JWT_EXPIRES },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GitHubStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
