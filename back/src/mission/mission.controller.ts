import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Controller,
} from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { response } from 'express';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  create(@Body() createMissionDto: CreateMissionDto) {
    return this.missionService.create(createMissionDto);
  }

  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionDto: UpdateMissionDto) {
    const mission = this.missionService.findOne(+id);
    if (mission === null) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Mission not found',
        })
        .send();
    }
    return this.missionService.update(+id, updateMissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const mission = this.missionService.findOne(+id);
    if (mission === null) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Mission not found',
        })
        .send();
    }
    return this.missionService.remove(+id);
  }
}
