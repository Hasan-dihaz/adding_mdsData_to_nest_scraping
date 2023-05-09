// import { dse_tables } from './data_migration/dse_data_migration.js';
// import { mdsdata_tables } from './data_migration/mds_data_migration.js';

import { Injectable } from '@nestjs/common';
import { TrdService } from './mdsdata/services/mdsdata.service';
import { Cron, CronExpression } from '@nestjs/schedule';

// dse_tables();

@Injectable()
export class Main {
  constructor(private readonly trdService: TrdService) {}
  //Start the browser and create a browser instance
  // @Cron(CronExpression.EVERY_5_MINUTES)
  @Cron(CronExpression.EVERY_MINUTE)
  // @Cron('*/2 * * * *') // for every 2 minutes
  async func() {
    console.log('Cron Started');

    const response = this.trdService.readAll();
    console.log('response...', response);
  }
}
