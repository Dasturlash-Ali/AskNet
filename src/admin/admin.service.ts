import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
// import { Admin } from "./schemas/admin.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { Admin } from "./schemas/admin.schemas";

@Injectable()
export class AdminService {
  findById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Password's is not much");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    return this.adminModel.create({ ...createAdminDto, hashed_password });
  }

  async updateRefreshToken(id: any, hashed_refresh_token: string | null) {
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      {_id:id},
      {
        hashed_refresh_token,
      },
      { new: true }
    );

    return updatedAdmin;
  }
  findAll() {
    return this.adminModel.find();
  }

  findByEmail(email: string) {
    return this.adminModel.findOne({ email });
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
