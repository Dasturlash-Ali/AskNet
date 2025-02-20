import { PartialType } from '@nestjs/swagger';
import { CreateStatisticDto } from './create-statistic.dto';

export class UpdateStatisticDto extends PartialType(CreateStatisticDto) {
    survey_id?: string;
    total_responses?: number;
    average_rating?: number;

}
