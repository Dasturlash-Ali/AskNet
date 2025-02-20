import { PartialType } from '@nestjs/swagger';
import { CreateResponseDto } from './create-response.dto';

export class UpdateResponseDto extends PartialType(CreateResponseDto) {
    participant_id?: number
    question_id?: number
    selected_options?:string
    text_response?:string
    numeric_response?:string
    image?:string
}
