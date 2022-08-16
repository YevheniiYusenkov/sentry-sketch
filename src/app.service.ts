import * as Sentry from '@sentry/node';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    const transaction = Sentry.startTransaction({
      op: 'test',
      name: 'My First Test Transaction',
    });

    setTimeout(() => {
      try {
        throw new BadRequestException('Error for sentry.');
      } catch (e) {
        Sentry.captureException(e);
      } finally {
        transaction.finish();
      }
    }, 99);
  }
}
