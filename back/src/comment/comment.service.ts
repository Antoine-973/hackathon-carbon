import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommentService {
  create(createCommentDto: CreateCommentDto) {
    try {
      return prisma.comment.create({
        data: {
          positiveVote: {create:[]},
          negativeVote: {create:[]},
          content: createCommentDto.content,
          createdBy: {
            connect: {
              id: createCommentDto.createdBy,
            },
          },
          topic: {
            connect: {
              id: createCommentDto.topicId,
            },
          },
        },

        include: {
            createdBy: true,
            positiveVote: true,
            negativeVote: true,
        }
      });
    } catch (e) {
      return e;
    }
  }

  findAll() {
    try {
      return prisma.comment.findMany({
        include: {
          createdBy: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (e) {
      return e;
    }
  }

  findOne(id: number) {
    try {
      return prisma.comment.findUnique({
        where: {
          id: id,
        },
        include: {
          createdBy: true,
        },
      });
    } catch (e) {
      return e;
    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      return prisma.comment.update({
        where: {
          id: id,
        },
        data: {
          content: updateCommentDto.content,
          createdBy: {
            connect: {
              id: updateCommentDto.createdBy,
            },
          },
          topic: {
            connect: {
              id: updateCommentDto.topicId,
            },
          },
        },
      });
    } catch (e) {
      return e;
    }
  }

  remove(id: number) {
    try {
      return prisma.comment.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return e;
    }
  }




}
