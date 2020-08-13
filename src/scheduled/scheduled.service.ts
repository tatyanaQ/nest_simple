import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ScheduledService {
  // @Cron('* * * * * *')
  // handleCron() {
  //   console.log('every second')
  // }
}
