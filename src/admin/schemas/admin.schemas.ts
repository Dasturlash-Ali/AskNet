
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  full_name: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  tg_link: string;

  @Prop()
  hashed_password: string;

  @Prop({default: true})
  is_active: boolean;

  @Prop({default: false})
  is_creator: boolean;

  @Prop()
  description: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
