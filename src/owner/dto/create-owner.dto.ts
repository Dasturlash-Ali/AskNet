import { ApiProperty } from "@nestjs/swagger";

export class CreateOwnerDto {
    @ApiProperty({example:"yangi owner"})
    name: string;
}
