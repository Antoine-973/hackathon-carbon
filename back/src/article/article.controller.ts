import {Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException} from '@nestjs/common';
import {ArticleService} from './article.service';
import {CreateArticleDto} from './dto/create-article.dto';
import {UpdateArticleDto} from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
    }

    @Post()
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articleService.create(createArticleDto);
    }

    @Get()
    findAll() {
        return this.articleService.findAll();
    }

    @Get('/last')
    findLastArticle() {
        return this.articleService.findLastArticle();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const article = await this.articleService.findOne(+id);
        if (!article) {
            throw new NotFoundException(`Article with ${id} does not exist.`);
        }
        return article;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        const article = await this.articleService.findOne(+id);
        if (!article) {
            throw new NotFoundException(`Article with id ${id} does not exist.`);
        }
        return this.articleService.update(+id, updateArticleDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const article = await this.articleService.findOne(+id);
        if (!article) {
            throw new NotFoundException(`Article with id ${id} does not exist.`);
        }
        return this.articleService.remove(+id);
    }
}
