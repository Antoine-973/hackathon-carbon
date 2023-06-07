import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(+id);
    if (!client) {
      throw new NotFoundException(`Client with ${id} does not exist.`);
    }
    return client;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    const client = await this.clientService.findOne(+id);
    if (!client) {
        throw new NotFoundException(`Client with id ${id} does not exist.`);
    }
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const client = await this.clientService.findOne(+id);
    if (!client) {
        throw new NotFoundException(`Client with id ${id} does not exist.`);
    }
    return this.clientService.remove(+id);
  }
}
