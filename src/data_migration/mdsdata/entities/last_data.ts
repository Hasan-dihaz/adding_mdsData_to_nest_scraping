import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LastDataDocument = lastData & Document;

@Schema()
export class lastData {
  @Prop({ type: String })
  companiesLastData: string;

  @Prop({ type: String })
  circuit_breaksLastData: string;

  @Prop({ type: String })
  idxLastData: string;

  @Prop({ type: String })
  manLastData: string;

  @Prop({ type: String })
  mkistatLastData: string;

  @Prop({ type: String })
  trdLastData: string;

  @Prop({ type: String })
  price_earningsLastData: string;
}
export const LastDataSchema = SchemaFactory.createForClass(lastData);
