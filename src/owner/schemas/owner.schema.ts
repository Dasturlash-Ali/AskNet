import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Cat } from "src/cat/schemas/cat.schema";

export type OwnerDocument = HydratedDocument<Owner>;

@Schema({ versionKey: false})
export class Owner {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: "Cat" }] })
  cats: Cat[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
