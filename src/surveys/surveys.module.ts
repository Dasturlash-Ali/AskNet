import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
