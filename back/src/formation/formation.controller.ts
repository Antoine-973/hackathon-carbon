import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import {FormationService} from './formation.service';
import {CreateFormationDto} from './dto/create-formation.dto';
import {UpdateFormationDto} from "./dto/update-formation.dto";
import {JoinFormationDto} from "./dto/join-formation.dto";
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
        const formation = await this.formationService.findOne(+id);
        if (!formation) {
            throw new NotFoundException(`Article with ${id} does not exist.`);
        }
        return formation;
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

    @Patch(':id/join')
    joinFormation(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
        return this.formationService.joinFormation(+id, updateFormationDto);
    }

    @Patch(':id/leave')
    leaveFormation(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
        return this.formationService.leaveFormation(+id, updateFormationDto);
    }
}
