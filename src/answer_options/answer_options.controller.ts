import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerOptionsService } from './answer_options.service';
import { CreateAnswerOptionDto } from './dto/create-answer_option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer_option.dto';

@Controller('answer-options')
export class AnswerOptionsController {
  constructor(private readonly answerOptionsService: AnswerOptionsService) {}

  @Post()
  create(@Body() createAnswerOptionDto: CreateAnswerOptionDto) {
    return this.answerOptionsService.create(createAnswerOptionDto);
  }

  @Get()
  findAll() {
    return this.answerOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerOptionDto: UpdateAnswerOptionDto) {
    return this.answerOptionsService.update(+id, updateAnswerOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerOptionsService.remove(+id);
  }
}
