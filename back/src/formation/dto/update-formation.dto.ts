import { PartialType } from '@nestjs/mapped-types';
import { CreateFormationDto } from './create-formation.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateFormationDto extends PartialType(CreateFormationDto) {

    @ApiProperty({required: false})
    participants: number[];
}
