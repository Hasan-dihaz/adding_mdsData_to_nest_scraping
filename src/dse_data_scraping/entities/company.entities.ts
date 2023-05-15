// import {
//   Entity,
//   Column,
//   // PrimaryGeneratedColumn,
//   PrimaryColumn,
//   // CreateDateColumn,
// } from 'typeorm';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompaniesDocument = Companies & Document;

// @Entity()
@Schema({
  timestamps: true, // Enables createdAt and updatedAt fields
})
export class Companies {
  @Prop({ type: String, index: true, unique: true })
  // @Column()
  // @PrimaryColumn()
  code: string;

  @Prop({ type: String })
  // @Column({ length: 100 })
  name: string;

  @Prop({ type: String })
  // @Column()
  last_agm: string;

  @Prop({ type: String })
  // @Column()
  market_capitalization_mn: string;

  @Prop({ type: String })
  // @Column()
  authorized_capital_mn: string; //!=========

  @Prop({ type: String })
  // @Column()
  paidup_capital_mn: string;

  @Prop({ type: String })
  // @Column()
  type_of_instrument: string;

  @Prop({ type: String })
  // @Column()
  total_outstanding_share_mn: string;

  @Prop({ type: String })
  // @Column()
  face_par_value: string;

  @Prop({ type: String })
  // @Column()
  sector: string;

  @Prop({ type: String })
  // @Column()
  cash_dividend: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  dividend_yield_percentage: string;

  @Prop({ type: String })
  // @Column()
  bonus_issued_stock_dividend: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  pe: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  eps: string;

  @Prop({ type: String })
  // @Column()
  listing_since: string;

  @Prop({ type: String })
  // @Column()
  category: string;

  @Prop({ type: String })
  // @Column()
  sponsor_director: string; //!-================

  @Prop({ type: String })
  // @Column({ nullable: true })
  govt: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  institute: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  _foreign: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  public: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  address: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  phone: string;

  @Prop({ type: String })
  // @Column({ nullable: true })
  email: string;

  // @Column('json', { nullable: true })
  @Prop({ type: JSON, nullable: true })
  eps_share: JSON;

  // // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // @Prop({ type: Date })
  // updated_at: Date;

  // // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // @Prop({ type: Date })
  // created_at: Date;
}

export const CompaniesSchema = SchemaFactory.createForClass(Companies);
