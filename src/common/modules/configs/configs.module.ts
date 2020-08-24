import { Module, Global } from '@nestjs/common';

import { providers } from '../../constants';
import config from './config';

@Global()
@Module({
  providers: [{
    provide: providers.CONFIG,
    useValue: config,
  }],
  exports: [providers.CONFIG],
})
export class ConfigModule {}
