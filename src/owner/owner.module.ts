import { Module } from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { OwnerController } from "./owner.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Owner, OwnerSchema } from "./schemas/owner.schema";
import { Cat, CatSchema } from "src/cat/schemas/cat.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Owner.name,
        schema: OwnerSchema,
      },
      {
        name: Cat.name,
        schema: CatSchema,
      },
    ]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
