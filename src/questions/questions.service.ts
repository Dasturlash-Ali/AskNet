import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private readonly questionModul: Model <Question>
  ) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.questionModul.create(createQuestionDto);
  }

  findAll() {
    return this.questionModul.find();
  }

  findOne(id: number) {
    return this.questionModul.findOne({id});
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModul.findByIdAndUpdate({id}, updateQuestionDto);
  }

  remove(id: number) {
    return this.questionModul.findByIdAndDelete({id});
  }
}
