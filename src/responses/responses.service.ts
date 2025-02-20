import { Injectable } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './schemas/response.entity';
import { Model } from 'mongoose';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name) private readonly responseModel: Model<Response> 
  ) {}
  create(createResponseDto: CreateResponseDto) {
    return this.responseModel.create(createResponseDto);
  }

  findAll() {
    return this.responseModel.find();
  }

  findOne(id: number) {
    return this.responseModel.findOne({id});
  }

  update(id: number, updateResponseDto: UpdateResponseDto) {
    return this.responseModel.findByIdAndUpdate({id}, updateResponseDto);
  }

  remove(id: number) {
    return this.responseModel.findByIdAndDelete({id});
  }
}
