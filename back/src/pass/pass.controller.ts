import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus} from '@nestjs/common';
import { PassService } from './pass.service';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import {response} from "express";

@Controller('pass')
export class PassController {
  constructor(private readonly passService: PassService) {}

  @Post()
  create(@Body() createPassDto: CreatePassDto) {
    return this.passService.create(createPassDto);
  }

  @Get()
  findAll() {
    return this.passService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePassDto: UpdatePassDto) {
    const pass  = await this.passService.findOne(+id);
    if (pass === null) {
        return response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Pass not found',
        }).send();
    }
    return  this.passService.update(+id, updatePassDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const pass  = this.passService.findOne(+id);
    if (pass === null) {
        return response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Pass not found',
        }).send();
    }
    return this.passService.remove(+id);
  }
}
