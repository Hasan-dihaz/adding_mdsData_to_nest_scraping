import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type Circuit_breaksDocument = Circuit_breaks & Document;

@Schema({
  timestamps: true, // Enables createdAt and updatedAt fields
})
export class Circuit_breaks {
  // @PrimaryColumn()
  @Prop({ type: String })
  trade_code: string;

  @Prop({ type: String })
  breaker: string;

  @Prop({ type: String })
  tickSize: string;

  @Prop({ type: String })
  openAdjPrice: string;

  @Prop({ type: String })
  floorPrice: string;

  @Prop({ type: String })
  lowerLimit: string;

  @Prop({ type: String })
  upperLimit: string;

  @Prop({ type: String })
  floorPriceBlockMarket: string; //!=============

  // @Prop({ type: Date, default: Date.now })
  // // @PrimaryColumn({ type: 'date' })
  // created_at: Date;

  // // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // // // @PrimaryColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // @Prop({ type: Date, default: Date.now })
  // updated_at: Date;

  // @BeforeInsert()
  // setPrimaryKey() {
  //   this.created_at = new Date();
  // }
}

export const Circuit_breaksSchema =
  SchemaFactory.createForClass(Circuit_breaks);
Circuit_breaksSchema.index({ createdAt: 1, trade_code: 1 }, { unique: true }); //Making compund Unique Key...!!!
// IdxSchema.index({ IDX_INDEX_ID: 1, IDX_DATE_TIME: 1 }, { unique: true });
