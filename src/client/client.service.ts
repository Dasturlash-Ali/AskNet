import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Client } from "./schemas/client.schema";
import { Model } from "mongoose";

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: typeof Model<Client>
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.clientModel.create(createClientDto);
  }

  findAll() {
    return this.clientModel.find();
  }

  findOne(id: string) {
    return this.clientModel.findById(id);
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.clientModel.findByIdAndDelete(id, { new: true });
  }
}
