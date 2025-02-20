import { Module } from '@nestjs/common';
import { SurveyStatusService } from './survey_status.service';
import { SurveyStatusController } from './survey_status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyStatus, SurveyStatusSchema } from './schemas/survey_status.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: SurveyStatus.name, schema: SurveyStatusSchema}])],
  controllers: [SurveyStatusController],
  providers: [SurveyStatusService],
})
export class SurveyStatusModule {}
