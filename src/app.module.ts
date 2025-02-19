import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TgUserModule } from './tg_user/tg_user.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { AuthModule } from './auth/auth.module';
import { CatModule } from './cat/cat.module';
import { OwnerModule } from './owner/owner.module';
import { BotModule } from './bot/bot.module';
import { ClientModule } from './client/client.module';
import { SurveysModule } from './surveys/surveys.module';
import { BOT_NAME } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      botName: BOT_NAME,
      token: process.env.BOT_TOKEN!,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    CatModule,
    OwnerModule,
    BotModule,
    ClientModule,
    SurveysModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
