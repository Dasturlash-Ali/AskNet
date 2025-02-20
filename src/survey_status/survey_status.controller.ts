import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyStatusService } from './survey_status.service';
import { CreateSurveyStatusDto } from './dto/create-survey_status.dto';
import { UpdateSurveyStatusDto } from './dto/update-survey_status.dto';

@Controller('survey-status')
export class SurveyStatusController {
  constructor(private readonly surveyStatusService: SurveyStatusService) {}

  @Post()
  create(@Body() createSurveyStatusDto: CreateSurveyStatusDto) {
    return this.surveyStatusService.create(createSurveyStatusDto);
  }

  @Get()
  findAll() {
    return this.surveyStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyStatusDto: UpdateSurveyStatusDto) {
    return this.surveyStatusService.update(+id, updateSurveyStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyStatusService.remove(+id);
  }
}
