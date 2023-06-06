import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({required: false})
    date: Date;

    // @ApiProperty({required: false})
    // participants: Array<User>;
}