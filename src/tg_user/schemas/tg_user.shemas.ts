import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TgUser {
    @Prop({unique: true})
    user_id: bigint;

    @Prop()
    username: string;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    phone_number: string;

    @Prop({default: false})
    status: boolean;

    @Prop()
    last_state: string;

    @Prop()
    user_lang: string;

    @Prop()
    real_name: string;

    @Prop()
    gender: string;

    @Prop()
    birth_year: number;

    @Prop()
    balance: number;

    @Prop()
    offer_code: string;
}

export const TgUserSchema = SchemaFactory.createForClass(TgUser);