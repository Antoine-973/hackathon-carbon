import {ApiProperty} from "@nestjs/swagger";

export class CreateDocumentDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    link: string;

    @ApiProperty()
    category: string;
}
