import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Bot } from "./schemas/bot.schema";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "src/app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Model } from "mongoose";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot.name) private readonly botModel: Model<Bot>,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onStart(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findOne({ user_id: String(user_id) });

      if (!user) {
        await this.botModel.create({
          user_id,
          user_name: ctx.from?.username,
          first_name: ctx.from?.first_name,
          last_name: ctx.from?.last_name,
          user_lang: ctx.from?.language_code,
          status: true,
          last_state: "real_name",
          balance:0
        });
        await ctx.reply("Botga hush kelibsiz, ILtimos o'zingizni haqiqiy ismingizni kiriting:")
      } else if (user && !user.status) {
        user.status = true;
        await user.save();
        
        await ctx.reply("Qaytganingiz bilan tabriklayman")

      } else if (user.last_state == "real_name" && user.status) {
        await ctx.reply(`Iltimos haqiqiy ismingizni kiriting:`, {
          ...Markup.removeKeyboard(),
        });
        await user.save();
      }
    } catch (error) {
      console.log("onStart error: ", error);
    }
  }

  async onActionGender(ctx: Context) {
    try {
      const user_id = ctx.callbackQuery!["data"].split("_")[1]
      const gender = ctx.callbackQuery!["data"].split("_")[0];
      const user = await this.botModel.findOne({ user_id: String(user_id) });
      

      if (!user || !user.status) {
        await ctx.reply(
          "Siz ro'yxatdan o'tmagansiz yoki faol emassiz, Iltimos oldin botni qayta ishga tushuring\n /start",
          {
            ...Markup.keyboard([["/start"]]).resize(),
          }
        );

      } else if (user && user.last_state == "gender") {
        user.gender = gender;
        user.last_state = "phone_number";
        await user.save();

        await ctx.reply(`📞 Iltimos telefon raqamingizni ulashing:`, {
          ...Markup.keyboard(
            [Markup.button.contactRequest("📞Kontaktni ulashish")],
          ).resize(),
        });
      }
    } catch (error) {
      console.log("onActionGender error: ", error);
    }
  }

  async hearYear(ctx: Context) {
    try {
      if ("text" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findOne({ user_id: String(user_id) });

        if (!user || !user.status) {
          await ctx.reply(
            "Siz ro'yxatdan o'tmagansiz yoki faol emassiz, Iltimos oldin botni qayta ishga tushuring\n /start",
            {
              ...Markup.keyboard([["/start"]]),
            }
          );
        } else if (user && user.last_state == "birth_year") {
          user.brith_year = ctx.message.text;
          user.last_state = "finish";
          await user.save()

          await ctx.reply(`Bergan ma'lumotlaringiz muvaffaqqiyatli qabul qilindi`, {
            ...Markup.removeKeyboard()
          });
        }
      }
    } catch (error) {
      console.log("hearYear error: ", error);
    }
  }


  async onContact(ctx: Context) {
    try {
      if ("contact" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findOne({ user_id: String(user_id) });

        if (!user || !user.status) {
          await ctx.reply(
            "Siz ro'yxatdan o'tmagansiz yoki faol emassiz, Iltimos oldin botni qayta ishga tushuring\n /start",
            {
              ...Markup.keyboard([["/start"]]),
            }
          );
        } else if (user && user.last_state == "phone_number") {
          user.phone_number = ctx.message.contact.phone_number;
          user.last_state = "birth_year";
          await user.save()

          await ctx.reply(`Tug'ilgan yilingizni kiriting masalan(2002):`, {
            ...Markup.removeKeyboard()
          });
        }
      }
    } catch (error) {
      console.log("onContact error: ", error);
    }
  }

  async onText(ctx: Context) {
    try {
      if ("text" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findOne({ user_id: String(user_id) });

        if (!user || !user.status) {
          await ctx.reply(
            "Siz ro'yxatdan o'tmagansiz yoki faol emassiz, Iltimos oldin botni qayta ishga tushuring\n /start",
            {
              ...Markup.keyboard([["/start"]]),
            }
          );
        } else if (user && user.last_state == "real_name") {
          user.real_name = ctx.message.text;
          user.last_state = "gender";
          await user.save()

          await ctx.reply(`Jinsingizni tasdiqlang:`, {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "Erkak ", callback_data: `male_${user.user_id}` },
                  { text: "Ayol", callback_data: `female_${user.user_id}` },
                ],
              ],
            },
          });
        }
      }
    } catch (error) {
      console.log("onText error: ", error);
    }
  }
}
