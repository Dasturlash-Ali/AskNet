import { Module } from '@nestjs/common';
import { AnswerOptionsService } from './answer_options.service';
import { AnswerOptionsController } from './answer_options.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerOption, AnswerOptionSchema } from './schema/answer_option.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: AnswerOption.name, schema: AnswerOptionSchema}])],
  controllers: [AnswerOptionsController],
  providers: [AnswerOptionsService],
})
export class AnswerOptionsModule {}
