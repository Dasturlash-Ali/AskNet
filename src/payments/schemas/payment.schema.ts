import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Survey } from "../../surveys/schemas/survey.schema";
import { TgUser } from "../../tg_user/schemas/tg_user.shemas";

export type PaymentDocument = HydratedDocument<Payment>

@Schema()
export class Payment {
    @Prop()
    survey_id: number

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
    participant_id: number

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
    amount: number

    @Prop()
    payment_status: boolean

    @Prop()
    payment_date: string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)