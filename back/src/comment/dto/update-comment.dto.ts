import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {

    @ApiProperty({required: false})
    positiveVote: number;

    @ApiProperty({required: false})
    negativeVote: number;
}
