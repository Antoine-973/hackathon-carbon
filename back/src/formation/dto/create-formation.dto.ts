import { ApiProperty } from '@nestjs/swagger';

export class CreateFormationDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({required: false})
    date: Date;

}
