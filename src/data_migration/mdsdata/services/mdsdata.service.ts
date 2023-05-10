import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { idx, IdxDocument } from '../entities/idx.entities';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataSource } from 'typeorm';

@Injectable()
export class IdxService {
  constructor(
    @InjectModel('idx') private idxModel: Model<IdxDocument>,
    // @InjectRepository()
    // private readonly repository: Repository<any>,
    private readonly dataSource: DataSource,
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
      await this.dataSource.query(query),
    );

    return await this.dataSource.query(query);
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
