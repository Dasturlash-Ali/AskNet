import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Statistic } from './schemas/statistic.schemas';
import { Model } from 'mongoose';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic.name) private readonly statisticModel: Model<Statistic>
  ) {}
  create(createStatisticDto: CreateStatisticDto) {
    return this.statisticModel.create(createStatisticDto);
  }

  findAll() {
    return this.statisticModel.find()
  }

  findOne(id: number) {
    return this.statisticModel.findOne({id});
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return this.statisticModel.findByIdAndUpdate({id}, updateStatisticDto);
  }

  remove(id: number) {
    return this.statisticModel.findByIdAndDelete({id});
  }
}
