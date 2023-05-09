import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { trd, TrdDocument } from '../entities/trd.entities';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrdService {
  constructor(
    @InjectModel('trd') private trdModel: Model<TrdDocument>,
    @InjectRepository(trd)
    private readonly trdRepository: Repository<trd>,
  ) {}

  async create(trd: trd): Promise<trd> {
    console.log('trd', trd);
    const newtrd = new this.trdModel(trd);
    return await newtrd.save();
  }

  async readAll(): Promise<trd[]> {
    const trdData: trd[] = await this.trdRepository.find();
    console.log('Calling...readAll');
    return trdData;
  }

  async readById(id): Promise<trd> {
    return await this.trdModel.findById(id).exec();
  }

  async update(trd): Promise<trd> {
    const id = new mongoose.Types.ObjectId(trd.id);
    return await this.trdModel.findByIdAndUpdate(id, trd, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.trdModel.findByIdAndRemove(id);
  }
}
