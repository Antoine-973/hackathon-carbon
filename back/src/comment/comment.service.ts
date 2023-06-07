import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class CommentService {
    create(createCommentDto: CreateCommentDto) {
        try {
            return prisma.comment.create({
                data: {
                    content: createCommentDto.content,
                    createdBy: {
                        connect: {
                            id: createCommentDto.createdBy
                        }
                    },
                    topic: {
                        connect: {
                            id: createCommentDto.topic
                        }
                    },
                },
            });
        }catch (e){
            return e
        }
    }

    findAll() {
        try {
            return prisma.comment.findMany()
        }catch (e){
            return e
        }
    }

    findOne(id: number) {
        try {
            return prisma.comment.findUnique({
                where: {
                    id: id
                }
            })
        }catch (e){
            return e
        }
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        try {
            return prisma.comment.update({
                where: {
                    id: id
                },
                data: {
                    content: updateCommentDto.content,
                    createdBy: {
                        connect: {
                            id: updateCommentDto.createdBy
                        }
                    },
                    topic: {
                        connect: {
                            id: updateCommentDto.topic
                        }
                    },
                    positiveVote: updateCommentDto.positiveVote,
                    negativeVote: updateCommentDto.negativeVote,
                },
            });
        }catch (e){
            return e
        }
    }

    remove(id: number) {
        try {
            return prisma.comment.delete({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return e
        }
    }

    upvote(id: number) {
        try {
            return prisma.comment.update({
                where: {
                    id: id
                },
                data: {
                    positiveVote: {
                        increment: 1
                    }
                }
            })
        } catch (e) {
            return e
        }
    }

    downvote(id: number) {
        try {
            return prisma.comment.update({
                where: {
                    id: id
                },
                data: {
                    negativeVote: {
                        increment: 1
                    }
                }
            })
        } catch (e) {
            return e
        }
    }
}
