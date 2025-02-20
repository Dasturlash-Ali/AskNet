import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AnswerOptionDocument = HydratedDocument<AnswerOption>;

@Schema()
export class AnswerOption {
    @Prop()
    question_id:number

    @Prop()
    option_uzb:string

    @Prop()
    option_rus:string
}

export const AnswerOptionSchema = SchemaFactory.createForClass(AnswerOption);
