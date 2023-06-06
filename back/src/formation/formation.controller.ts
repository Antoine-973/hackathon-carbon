import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import {FormationService} from './formation.service';
import {CreateFormationDto} from './dto/create-formation.dto';
import {UpdateFormationDto} from './dto/update-formation.dto';
import {ApiOkResponse} from "@nestjs/swagger";

@Controller('formation')
export class FormationController {
    constructor(private readonly formationService: FormationService) {
    }

    @Post()
    create(@Body() createFormationDto: CreateFormationDto) {
        return this.formationService.create(createFormationDto);
    }

    @Get()
    findAll() {
        return this.formationService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const article = await this.formationService.findOne(+id);
        if (!article) {
            throw new NotFoundException(`Article with ${id} does not exist.`);
        }
        return article;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
        const formation = await this.formationService.findOne(+id);
        if (!formation) {
            throw new NotFoundException(`Formation with id ${id} does not exist.`);
        }
        return this.formationService.update(+id, updateFormationDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const formation = await this.formationService.findOne(+id);
        if (!formation) {
            throw new NotFoundException(`Formation with id ${id} does not exist.`);
        }
        return this.formationService.remove(+id);
    }

    @Patch(':id/participants')
    async addParticipant(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
        const formation = await this.formationService.findOne(+id);
        if (!formation) {
            throw new NotFoundException(`Formation with id ${id} does not exist.`);
        }
        return this.formationService.addParticipant(+id, updateFormationDto);
    }
}
