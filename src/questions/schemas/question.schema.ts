import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Survey } from "../../surveys/schemas/survey.schema";

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
    @Prop()
    survey_id: number
    @Prop({
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Survey",
            }
        ]
    })
    surveys: Survey[];
    static schema: any;

    @Prop()
    field_type:string;

    @Prop()
    question_uzb:string;

    @Prop()
    question_rus:string;

    @Prop()
    input_method:string;

    @Prop()
    parent_question_id:number;

    @Prop()
    image:string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
