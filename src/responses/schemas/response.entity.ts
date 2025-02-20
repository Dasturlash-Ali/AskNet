import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { TgUser } from "../../tg_user/schemas/tg_user.shemas";
import { Question } from "../../questions/schemas/question.schema";

export type ResponseDocument = HydratedDocument<Response>

@Schema()
export class Response {
    @Prop()
    participant_id: number

    @Prop({
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "TgUser",
            },
        ],
    })
    participant: TgUser[];
    static schema: any;

    @Prop()
    question_id: number

    @Prop({
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Question",
            },
        ],
    })
    question: Question[];
    static schemas: any;

    @Prop()
    selected_options:string

    @Prop()
    text_response:string

    @Prop()
    numeric_response:string

    @Prop()
    image:string
}


export const ResponseSchema = SchemaFactory.createForClass(Response);