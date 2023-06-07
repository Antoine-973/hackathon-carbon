import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({required: false})
    date: Date;

}