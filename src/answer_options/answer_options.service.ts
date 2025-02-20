import { Injectable } from '@nestjs/common';
import { CreateAnswerOptionDto } from './dto/create-answer_option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer_option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnswerOption } from './schema/answer_option.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnswerOptionsService {
  constructor(
    @InjectModel(AnswerOption.name) private readonly answerOptionModel: Model<AnswerOption>
  ) {}
  create(createAnswerOptionDto: CreateAnswerOptionDto) {
    return this.answerOptionModel.create(createAnswerOptionDto);
  }

  findAll() {
    return this.answerOptionModel.find();
  }

  findOne(id: number) {
    return this.answerOptionModel.findOne({id});
  }

  update(id: number, updateAnswerOptionDto: UpdateAnswerOptionDto) {
    return this.answerOptionModel.findByIdAndUpdate({id}, updateAnswerOptionDto);
  }

  remove(id: number) {
    return this.answerOptionModel.findByIdAndDelete({id});
  }
}
