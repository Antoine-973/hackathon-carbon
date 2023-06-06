import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    createdBy: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    note: number;

    @ApiProperty({required: false})
    clientId: number;
}
