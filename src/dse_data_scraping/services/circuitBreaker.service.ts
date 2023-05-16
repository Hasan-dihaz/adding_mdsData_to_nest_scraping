// company.service.ts
import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { CreateCircuitBreakerDto } from '../dto/circuitBreaker.dto';

import {
  Circuit_breaks,
  Circuit_breaksDocument,
} from '../entities/circuitBreaker.entities';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CircuitBreakerService {
  constructor(
    @InjectModel('Circuit_breaks')
    private circuit_breaksModel: Model<Circuit_breaksDocument>,
  ) {}

  async upsertCircuitBreakerEntity(
    createCircuitBreakerDtos: CreateCircuitBreakerDto[],
  ): Promise<void> {
    // const a = 0;
    for (const createCircuitBreakerDto of createCircuitBreakerDtos) {
      // a++;
      // console.log('createPeDtos...', createCircuitBreakerDto);
      // if (a == 3) {
      //   break;
      // }
      const {
        trade_code,
        breaker,
        tickSize,
        openAdjPrice,
        floorPrice,
        lowerLimit,
        upperLimit,
        floorPriceBlockMarket,
        // date,
      } = createCircuitBreakerDto;
      const circuitBreaker = new Circuit_breaks();

      circuitBreaker.trade_code = trade_code;
      circuitBreaker.breaker = breaker;
      circuitBreaker.tickSize = tickSize;
      circuitBreaker.openAdjPrice = openAdjPrice;
      circuitBreaker.floorPrice = floorPrice;
      circuitBreaker.lowerLimit = lowerLimit;
      circuitBreaker.upperLimit = upperLimit;
      circuitBreaker.floorPriceBlockMarket = floorPriceBlockMarket;

      //!==================================

      try {
        // await this.circuit_breaksModel.insertMany(circuitBreaker, {
        //   ordered: false,
        // });

        await this.circuit_breaksModel.updateOne(
          {
            trade_code: trade_code,
            updatedAt: {
              $gte: new Date().setHours(9, 30, 0, 0), // Set the start time to 9:30 AM
              $lt: new Date().setHours(15, 0, 0, 0), // Set the end time to 3:00 PM
            },
          },
          {
            $set: circuitBreaker,
          },
          { upsert: true },
        );
      } catch (error) {
        console.log('Error in circuit_breaker_service', error);
      }
      //!==================================

      //   const queryBuilder = this.circuitBreakerRepository
      //     .createQueryBuilder()
      //     .insert()
      //     .into(Circuit_breaks)
      //     .values(circuitBreaker)
      //     .orUpdate(
      //       [
      //         'breaker',
      //         'tickSize',
      //         'openAdjPrice',
      //         'floorPrice',
      //         'lowerLimit',
      //         'upperLimit',
      //         'floorPriceBlockMarket',
      //         'updated_at',
      //       ],
      //       // ['externalId'],
      //       // {
      //       //   skipUpdateIfNoValuesChanged: true,
      //       //   // indexPredicate: 'date > 2020-01-01',
      //       // },
      //     );
      //   // .orUpdate([
      //   //   'breaker',
      //   //   'tickSize',
      //   //   'openAdjPrice',
      //   //   'floorPrice',
      //   //   'lowerLimit',
      //   //   'upperLimit',
      //   //   'floorPriceBlockMakret',
      //   //   // 'updated_at',
      //   // ]);
      //   await queryBuilder.execute();
    }
  }
}
