import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Client } from "src/client/schemas/client.schema";

export type SurveysDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
  @Prop()
  title_uzb: string;
  @Prop()
  title_rus: string;
  @Prop()
  description_uzb: string;
  @Prop()
  description_rus: string;
  @Prop()
  client_id: string;
  @Prop({
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Client",
      },
    ],
  })
  clients: Client[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
