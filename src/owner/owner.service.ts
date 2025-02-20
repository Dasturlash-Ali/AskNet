import { Injectable } from "@nestjs/common";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { UpdateOwnerDto } from "./dto/update-owner.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Owner } from "./schemas/owner.schema";
import { Model } from "mongoose";

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private readonly ownerModel: Model<Owner>) {}
  
  create(createOwnerDto: CreateOwnerDto) {
    return this.ownerModel.create(createOwnerDto)
  }

  findAll() {
    return this.ownerModel.find()
  }

  findOne(id: number) {
    return this.ownerModel.findOne({id});
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return this.ownerModel.findByIdAndUpdate({id}, updateOwnerDto);
  }

  remove(id: number) {
    return this.ownerModel.findByIdAndDelete({id});
  }
}
