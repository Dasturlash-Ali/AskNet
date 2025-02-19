import { Module } from '@nestjs/common';
import { TgUserService } from './tg_user.service';
import { TgUser, TgUserSchema } from './schemas/tg_user.shemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TgUser.name, schema: TgUserSchema }]),
  ],
  controllers: [],
  providers: [TgUserService],
})
export class TgUserModule {}
