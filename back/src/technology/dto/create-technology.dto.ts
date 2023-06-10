import {ApiProperty} from "@nestjs/swagger";

export class CreateTechnologyDto {

    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly description: string;
}
