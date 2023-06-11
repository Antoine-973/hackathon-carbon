import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import {UpdateDocumentDto} from "./dto/update-document.dto";
import {CreateDocumentDto} from "./dto/create-document.dto";
import {DocumentsService} from "./documents.service";

@Controller('document')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get('/last')
  findLastArticle() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const document = await this.documentsService.findOne(+id);
    if (!document) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }
    return document;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentsService.findOne(+id);
    if (!document) {
      throw new NotFoundException(`Article with id ${id} does not exist.`);
    }
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const document = await this.documentsService.findOne(+id);
    if (!document) {
      throw new NotFoundException(`Article with id ${id} does not exist.`);
    }
    return this.documentsService.remove(+id);
  }
}
