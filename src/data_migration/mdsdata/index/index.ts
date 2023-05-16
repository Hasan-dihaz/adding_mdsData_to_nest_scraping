import { Injectable } from '@nestjs/common';
// import { IdxService } from './mdsdata/services/Unused/mdsdata.service';
import { MdsdataService } from '../services/mdsdata.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class IndexProvider {
  // constructor(private readonly idxService: IdxService) {}
  constructor(private readonly mdsdataService: MdsdataService) {}
  //Start the browser and create a browser instance
  @Cron('30/5 9-15 * * 0-4') // Starts everyday at 9.30 am from sunday to thursday and repeats after every 5 minutes.
  // @Cron('*/30 * * * * *')
  async func() {
    console.log('Cron Started in mdsdata');

    const response = await this.mdsdataService.readAll();
    // console.log('response...', response);
  }
}
