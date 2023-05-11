import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import {
//   Entity,
//   Column,
//   // PrimaryGeneratedColumn,
//   PrimaryColumn,
//   // BeforeInsert,
//   // CreateDateColumn,
// } from 'typeorm';

export type ManDocument = man & Document;

// @Entity()
@Schema()
export class man {
  // @Column()
  @Prop({ type: String })
  MAN_ANNOUNCEMENT_DATE_TIME: string;

  // @Column()
  @Prop({ type: String })
  MAN_ANNOUNCEMENT_PREFIX: string;

  // @Column()
  @Prop({ type: String })
  MAN_ANNOUNCEMENT: string;

  // @PrimaryColumn()
  @Prop({ type: String })
  MAN_EXPIRY_DATE: string; /*Need to use type Date.......Custom date fromate needed */
}

export const ManSchema = SchemaFactory.createForClass(man);

ManSchema.index(
  { MAN_ANNOUNCEMENT_DATE_TIME: 1, MAN_ANNOUNCEMENT: 1 },
  { unique: true },
);
// export default mongoose.models.man_md || mongoose.model('man_md', manSchema);
// // module.exports= mongoose.model('trd', trdSchema);
