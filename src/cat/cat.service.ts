import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./schemas/cat.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Owner } from "src/owner/schemas/owner.schema";

@Injectable()
export class CatService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Owner.name) private readonly ownerModel: Model<Owner>
  ) {}

  async create(createCatDto: CreateCatDto) {
    const { owner: ownerId } = createCatDto;
    const owner = await this.ownerModel.findById(ownerId);
    if(!owner){
      throw new BadRequestException("Owner not found")
    }
    const cat = await this.catModel.create(createCatDto)
    owner.cats.push(cat)
    await owner.save()
    return cat
  }

  findAll() {
    return this.catModel.find()
  }

  findOne(id: number) {
    return this.catModel.findOne({id});
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return this.catModel.findByIdAndUpdate({id}, updateCatDto);
  }

  remove(id: number) {
    return this.catModel.findByIdAndDelete({id});
  }
}
