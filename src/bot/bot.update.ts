import { Context } from 'telegraf';
import { BotService } from './bot.service';
import { Action, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.onStart(ctx);
  }

  @Action(/^(male|female)_\d+$/)
  async onActionGender(@Ctx() ctx: Context) {
    await this.botService.onActionGender(ctx);
  }
  
  @Hears(/^(?:19[5-9]\d|20(?:0\d|1\d|2[0-5]))$/)
  async hearYear(@Ctx() ctx: Context) {
    await this.botService.hearYear(ctx);
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }
  
  @On('text')
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

}
