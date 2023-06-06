import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus} from '@nestjs/common';
import { StageService } from './stage.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import {response} from "express";

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stageService.create(createStageDto);
  }

  @Get()
  findAll() {
    return this.stageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stageService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) {
    const stage = await this.stageService.findOne(+id);
    if (stage === null) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Pass not found',
      }).send();

    }
    return this.stageService.update(+id, updateStageDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    const stage = await this.stageService.findOne(+id);
    if (stage === null) {
        return response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Pass not found',
        }).send();
    }
    return this.stageService.remove(+id);
  }
}
