import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { LastDataDocument } from '../entities/last_data';

@Injectable()
export class LastDataService {
  constructor(
    @InjectModel('lastData') private lastDataModel: Model<LastDataDocument>,
  ) {}

  async setLastData(Doc) {
    // console.log('Set Value...', Doc);

    await this.lastDataModel.findOneAndUpdate(
      {},
      { $set: Doc },
      { upsert: true },
    );
    // console.log('Set Value...222', Doc);
  }

  async getLastData() {
    let lastDoc = await this.lastDataModel.find({});
    if (lastDoc.length == 0) {
      const lastdata = {
        companiesLastData: '0',
        circuit_breaksLastData: '0',
        idxLastData: '0',
        manLastData: '0',
        mkistatLastData: '0',
        trdLastData: '0',
        price_earningsLastData: '0',
      };
      // lastDoc.push(lastdata);
      await this.setLastData(lastdata);
      lastDoc = await this.lastDataModel.find({});
      //   console.log('await company.find({})', lastDoc);
      return lastDoc;
    }

    // console.log("LastData", lastDoc);
    return lastDoc;
  }
}
