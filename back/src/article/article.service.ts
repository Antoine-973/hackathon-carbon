import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {CreateArticleDto} from "./dto/create-article.dto";
import {UpdateArticleDto} from "./dto/update-article.dto";

const prisma = new PrismaClient();

@Injectable()
export class ArticleService {
    create(createArticleDto: CreateArticleDto) {
        try {
            return prisma.article.create({
                data: createArticleDto,
            });
        } catch (e) {
            return e;
        }
    }

    findAll() {
        try {
            return prisma.article.findMany();
        } catch (e) {
            return e;
        }
    }

    findOne(id: number) {
        try {
            return prisma.article.findUnique({
                where: {
                    id: id,
                }
            });
        } catch (e) {
            return e;
        }
    }

    update(id: number, updateArticleDto: UpdateArticleDto) {
        try {
            return prisma.article.update({
                where: {
                    id: id,
                },
                data: updateArticleDto,
            });
        } catch (e) {
            return e;
        }
    }

    remove(id: number) {
        try {
            return prisma.article.delete({
                where: {
                    id: id,
                },
            });
        } catch (e) {
            return e;
        }
    }

    findLastArticle() {
        try {
            return prisma.article.findFirst({
                orderBy: {
                    id: 'desc',
                },
            });
        } catch (e) {
            return e;
        }
    }
}
