import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { MongooseModule } from '@nestjs/mongoose';
import { Bot, BotSchema } from './schemas/bot.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: Bot.name,
          schema: BotSchema,
        },
      ]),
    ],
  providers: [BotUpdate,BotService,],
  exports:[BotService]
})
export class BotModule {}
