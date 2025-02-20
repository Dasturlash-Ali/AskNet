import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';
import { Model } from 'mongoose';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private readonly surveyModel: Model<Survey>
  ) {}
  create(createSurveyDto: CreateSurveyDto) {
    return this.surveyModel.create(createSurveyDto);
  }

  findAll() {
    return this.surveyModel.find();
  }

  findOne(id: number) {
    return this.surveyModel.findOne({id});
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return this.surveyModel.findByIdAndUpdate({id}, updateSurveyDto);
  }

  remove(id: number) {
    return this.surveyModel.findByIdAndDelete({id});
  }
}
