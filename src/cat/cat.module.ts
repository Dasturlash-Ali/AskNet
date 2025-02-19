import { Module } from "@nestjs/common";
import { CatService } from "./cat.service";
import { CatController } from "./cat.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "./schemas/cat.schema";
import { Owner, OwnerSchema } from "src/owner/schemas/owner.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema,
      },
      {
        name: Owner.name,
        schema: OwnerSchema,
      },
    ]),
  ],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
