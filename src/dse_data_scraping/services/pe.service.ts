// company.service.ts
import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { CreatePeDto } from '../dto/pe.dto';

import {
  Price_earnings,
  Price_earningsDocument,
} from '../entities/pe.entities';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PeService {
  constructor(
    @InjectModel('Price_earnings')
    private price_earningsModel: Model<Price_earningsDocument>,
  ) {}

  //!===============================================
  // CreatePeDto
  async upsertPeEntity(createPeDtos: CreatePeDto[]): Promise<void> {
    // let a = 0;
    for (const createPeDto of createPeDtos) {
      // a++;
      // console.log('createPeDtos...', createPeDto);
      // if (a == 3) {
      //   break;
      // }

      const {
        company_code,
        close_price,
        ycp,
        pe_1,
        pe_2,
        pe_3,
        pe_4,
        pe_5,
        pe_6,
        // created_at,
        // date,
      } = createPeDto;

      const pe = new Price_earnings();

      pe.company_code = company_code;
      pe.close_price = close_price;
      pe.ycp = ycp;
      pe.pe_1 = pe_1;
      pe.pe_2 = pe_2;
      pe.pe_3 = pe_3;
      pe.pe_4 = pe_4;
      pe.pe_5 = pe_5;
      pe.pe_6 = pe_6;
      // pe.created_at = created_at;

      //!==================================

      try {
        // await this.price_earningsModel.insertMany(pe, {
        //   ordered: false,
        // });

        await this.price_earningsModel.updateOne(
          {
            company_code: company_code,
            updatedAt: {
              $gte: new Date().setHours(9, 30, 0, 0), // Set the start time to 9:30 AM
              $lt: new Date().setHours(15, 0, 0, 0), // Set the end time to 3:00 PM
            },
          },
          {
            $set: pe,
          },
          { upsert: true },
        );
      } catch (error) {
        console.log('Error in pe_service');
      }
      //!==================================

      // const queryBuilder = this.peRepository
      //   .createQueryBuilder()
      //   .insert()
      //   .into(Price_earnings)
      //   .values(pe)
      //   .orUpdate(
      //     [
      //       'company_code',
      //       'close_price',
      //       'ycp',
      //       'pe_1',
      //       'pe_2',
      //       'pe_3',
      //       'pe_4',
      //       'pe_5',
      //       'pe_6',
      //       'updated_at',
      //       'created_at',
      //     ],
      //     // [
      //     //   // 'company_code',
      //     //   // 'close_price',
      //     //   // 'ycp',
      //     //   // 'pe_1',
      //     //   // 'pe_2',
      //     //   // 'pe_3',
      //     //   // 'pe_4',
      //     //   // 'pe_5',
      //     //   // 'pe_6',
      //     //   // 'created_at',
      //     // ],
      //     // {
      //     //   skipUpdateIfNoValuesChanged: true,
      //     //   // indexPredicate: 'date > 2020-01-01',
      //     // },
      //   );

      // await queryBuilder.execute();

      // const upsertedEntity = await this.peRepository.findOneOrFail({
      //   where: { company_code: company_code },
      // });
    }

    // return upsertedEntity;
  }
}
