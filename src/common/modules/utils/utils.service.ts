import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  capitalize(data: string): string {
    return data.toUpperCase();
  }
}
