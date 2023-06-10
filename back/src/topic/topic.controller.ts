import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const topic = await this.topicService.findOne(+id);
    if (!topic) {
      throw new NotFoundException(`Topic with ${id} does not exist.`);
    }
    return topic;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicService.findOne(+id);
    if (!topic) {
        throw new NotFoundException(`Topic with id ${id} does not exist.`);
    }
    return this.topicService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const topic = await this.topicService.findOne(+id);
    if (!topic) {
        throw new NotFoundException(`Topic with id ${id} does not exist.`);
    }
    return this.topicService.remove(+id);
  }
}
