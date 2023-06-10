import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    email: string;
}
