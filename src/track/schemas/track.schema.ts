import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;
  @Prop()
  artist: string;
  @Prop()
  text: string;
  @Prop()
  listens: number;
  @Prop()
  picture: string;
  @Prop()
  audio: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
