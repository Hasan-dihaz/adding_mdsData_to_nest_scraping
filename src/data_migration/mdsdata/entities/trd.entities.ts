import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   PrimaryColumn,
//   // BeforeInsert,
//   // CreateDateColumn,
// } from 'typeorm';

export type TrdDocument = trd & Document;

// @Entity()
@Schema()
export class trd {
  // TRD_SNO: {
  //   type: Date,
  //   index: true,
  //   unique: true,
  // },

  // @Column()
  @Prop({ type: Date })
  TRD_SNO: Date;

  // @Column()
  @Prop({ type: Number })
  TRD_TOTAL_TRADES: number;

  // @Column()
  @Prop({ type: Number })
  TRD_TOTAL_VOLUME: number;

  // @Column()
  @Prop({ type: Number })
  TRD_TOTAL_VALUE: number;

  // @PrimaryColumn()
  // @Prop({ type: Date })
  // TRD_LM_DATE_TIME: Date;
}

export const TrdSchema = SchemaFactory.createForClass(trd);

// export default mongoose.models.trd_md || mongoose.model('trd_md', trdSchema);
// // module.exports= mongoose.model('trd', trdSchema);
