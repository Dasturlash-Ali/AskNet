import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Survey } from "../../surveys/schemas/survey.schema";

export type StatisticDocument = HydratedDocument<Statistic>;

@Schema()
export class Statistic {
    @Prop()
    survey_id: number;
    @Prop({
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Survey",
            },
        ],
    })

    @Prop()
    total_responses: number;

    @Prop()
    average_rating: number;

    surveys: Survey[];
    static schema: any;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
