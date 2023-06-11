import { Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class RewardService {
  create(createRewardDto: CreateRewardDto) {
    try {
      return prisma.reward.create({
        data: {
          title: createRewardDto.title,
          description: createRewardDto.description,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  findAll() {
    try {
      return prisma.reward.findMany({
        include: {
          stage: true,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  findOne(id: number) {
    try {
      return prisma.reward.findUnique({
        where: { id: id },
        include: {
          stage: true,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  update(id: number, updateRewardDto: UpdateRewardDto) {
    try {
      return prisma.reward.update({
        where: { id: id },
        data: updateRewardDto,
      });
    } catch (error) {
      console.error(error);
    }
  }

  remove(id: number) {
    try {
      return prisma.reward.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
