import { ApiProperty } from "@nestjs/swagger";

export class CreateCatDto {
  @ApiProperty({ example: "Kisa" })
  name: string;
  @ApiProperty({ example: 2 })
  age: number;
  @ApiProperty({ example: "oliy" })
  breed: string;
  @ApiProperty({ example: "67af298404962fc0b91e09cb" })
  owner: string;
}
