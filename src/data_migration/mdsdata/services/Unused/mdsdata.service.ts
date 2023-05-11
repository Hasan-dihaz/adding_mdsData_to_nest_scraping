import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { idx, IdxDocument } from '../../entities/idx.entities';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataSource } from 'typeorm';

import { Db1Repository } from '../../Unsued/repositories/db1.repository';
import { Db2Repository } from '../../Unsued/repositories/db2.repository';
// import { db1Config } from '../dbconfig/db1.config';
@Injectable()
export class IdxService {
  // constructor(
  //   @InjectModel('idx') private idxModel: Model<IdxDocument>,
  //   // @InjectRepository()
  //   // private readonly repository: Repository<any>,
  //   private readonly dataSource: DataSource,
  // ) {}

  constructor(
    @InjectRepository(Db1Repository)
    private readonly db1Repository: Db1Repository,
    @InjectRepository(Db2Repository)
    private readonly db2Repository: Db2Repository,
  ) {}

  // async create(idx: idx): Promise<idx> {
  //   console.log('idx', idx);
  //   const newidx = new this.idxModel(idx);
  //   return await newidx.save();
  // }

  // async readAll(): Promise<idx[]> {
  //   const idxData: idx[] = await this.idxRepository.find();
  //   console.log('Calling...readAll');
  //   return idxData;
  // }

  async readAll(): Promise<any> {
    const query = 'SELECT * FROM man';
    console.log(
      'await this.dataSource.query(query);',
      await this.db2Repository.query(query),
    );

    return await this.db2Repository.query(query);
  }

  // async readById(id): Promise<idx> {
  //   return await this.idxModel.findById(id).exec();
  // }

  // async update(idx): Promise<idx> {
  //   const id = new mongoose.Types.ObjectId(idx.id);
  //   return await this.idxModel.findByIdAndUpdate(id, idx, { new: true });
  // }

  // async delete(id): Promise<any> {
  //   return await this.idxModel.findByIdAndRemove(id);
  // }
}
