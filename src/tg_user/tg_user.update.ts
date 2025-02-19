import { InjectModel } from "@nestjs/mongoose";
import { Ctx, Start, Update } from "nestjs-telegraf";
import { TgUser, TgUserSchema } from "./schemas/tg_user.shemas";
import { TgUserService } from "./tg_user.service";
import { Context } from "telegraf";


@Update()
export class TgUserUpdate{
    constructor(
        private readonly tgUser: TgUserService,
        @InjectModel(TgUser.name) private readonly tgUserModel: typeof TgUser
    ){}

    @Start()
    async onStart(@Ctx() ctx: Context){
        await this.tgUser.start(ctx)
    }
}