import { PartialType } from '@nestjs/swagger';
import { CreateAnswerOptionDto } from './create-answer_option.dto';

export class UpdateAnswerOptionDto extends PartialType(CreateAnswerOptionDto) {
    question_id?:number
    option_uzb?:string
    option_rus?:string
}
