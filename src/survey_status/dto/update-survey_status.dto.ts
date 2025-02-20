import { PartialType } from '@nestjs/swagger';
import { CreateSurveyStatusDto } from './create-survey_status.dto';

export class UpdateSurveyStatusDto extends PartialType(CreateSurveyStatusDto) {}
