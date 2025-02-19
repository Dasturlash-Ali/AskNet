import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TgUser } from './schemas/tg_user.shemas';
import { Model } from 'mongoose';
import { BOT_NAME } from '../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';


@Injectable()
export class TgUserService {
  constructor(
  @InjectModel(TgUser.name) private readonly tgUserModel: Model<TgUser>,
  @InjectModel(BOT_NAME) private readonly bot: Telegraf<Context>
  ){}

  async start(ctx: Context){
    const user_id = ctx.from?.id
    const user = await this.tgUserModel.findById(user_id)

    if(!user){
      await this.tgUserModel.create({
        user_id,
        username: ctx.from?.username,
        first_name: ctx.from?.first_name,
        last_name: ctx.from?.last_name,
        user_lang: ctx.from?.language_code,
      });

      await ctx.reply(`<b>📞 Telefon raqamini yuborish</b> tugmasini bosing`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📞 Telefon raqamini yuborish")]
          ])
          .resize()
          .oneTime()
        }
      )
    } else if(!user.status){
      await ctx.reply(`Iltimos, <b>📞Telefon raqamni yuborish</b> tugmasini bosing`,
        {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📞Telefon raqamni yuborish")]
          ])
          .resize()
          .oneTime()
        }
      )
    } else {
      await this.bot.telegram.sendChatAction(user_id!, 'typing');
      await ctx.reply(`Ushbu bot So'rovnomalar o'tkazish uchun yaratildi!`,
        {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        }
      )
    }
  }
}
