import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientDocument = HydratedDocument<Client>;

export class Client {
  @Prop({
    required:true
  })
  full_name: string;
  @Prop({
    required:true
  })
  company: string;
  @Prop({
    required:true
  })
  phone_number: string;
  @Prop({
    required:true
  })
  description: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
