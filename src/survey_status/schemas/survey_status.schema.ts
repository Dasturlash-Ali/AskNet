import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { TgUser } from "../../tg_user/schemas/tg_user.shemas";
import { Survey } from "../../surveys/schemas/survey.schema";

export type SurveyStatusDocument = HydratedDocument<SurveyStatus>;

@Schema()
export class SurveyStatus {
    @Prop()
    participant_id:number

    @Prop({
        type: [
            {
                type:mongoose.Schema.ObjectId,
                ref: "TgUser"
            },
        ],
    })
    participant: TgUser[];
    static schemas: any;

    @Prop()
    survey_id: number;

    @Prop({
        type: [
            {
                type:mongoose.Schema.ObjectId,
                ref: "Survey"
            },
        ],
    })
    survey: Survey[];
    static schema: any;

    @Prop()
    status: boolean;

    @Prop()
    last_question_id:number;

    @Prop()
    progress:string;
}

export const SurveyStatusSchema = SchemaFactory.createForClass(SurveyStatus)
