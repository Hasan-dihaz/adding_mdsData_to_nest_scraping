import { Injectable } from '@nestjs/common';
// import { IdxService } from './mdsdata/services/Unused/mdsdata.service';
import { MysqlService } from './mdsdata/services/mdsdata.service';
import { Cron, CronExpression } from '@nestjs/schedule';

// dse_tables();

@Injectable()
export class Main {
  // constructor(private readonly idxService: IdxService) {}
  constructor(private readonly idxService: MysqlService) {}
  //Start the browser and create a browser instance
  // @Cron(CronExpression.EVERY_5_MINUTES)
  @Cron(CronExpression.EVERY_MINUTE)
  // @Cron('*/2 * * * *') // for every 2 minutes
  async func() {
    console.log('Cron Started');

    const response = await this.idxService.readAll();
    // console.log('response...', response);
  }
}
