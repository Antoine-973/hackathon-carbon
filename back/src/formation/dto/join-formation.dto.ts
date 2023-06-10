import { ApiProperty } from '@nestjs/swagger';

export class JoinFormationDto {

    @ApiProperty({required: false})
    participants: number[];

}
