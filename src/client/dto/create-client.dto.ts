import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class CreateClientDto {
  @IsString()
  @ApiProperty({
    example: "Abdulazizbek Abdusodiqov",
  })
  full_name: string;
  
  @IsString()
  @ApiProperty({
    example: "Abdulaziz-Dev",
  })
  company: string;
  
  @IsPhoneNumber('UZ')
  @ApiProperty({
    example: "+998931234567",
  })
  phone_number: string;
  
  @IsString()
  @ApiProperty({
    example: "good company",
  })
  description: string;
}
