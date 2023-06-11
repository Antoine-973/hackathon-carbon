import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const comment = await this.commentService.findOne(+id);
        if (!comment) {
            throw new NotFoundException(`Comment with ${id} does not exist.`);
        }
        return comment;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        const comment = await this.commentService.findOne(+id);
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} does not exist.`);
        }
        return this.commentService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const comment = await this.commentService.findOne(+id);
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} does not exist.`);
        }
        return this.commentService.remove(+id);
    }


}
