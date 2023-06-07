import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MissionService {
  create(createMissionDto: CreateMissionDto) {
    try {
      return prisma.mission.create({
        data: {
          title: createMissionDto.title,
          description: createMissionDto.description,
          client: {
            connect: {
              id: createMissionDto.clientId,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  findAll() {
    try {
      return prisma.mission.findMany({
        include: {
          client: true,
        },
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  findOne(id: number) {
    try {
      return prisma.mission.findUnique({
        where: {
          id: id,
        },
        include: {
          client: true,
        },
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  update(id: number, updateMissionDto: UpdateMissionDto) {
    try {
      return prisma.mission.update({
        where: {
          id: id,
        },
        data: {
          title: updateMissionDto.title,
          description: updateMissionDto.description,
          client: {
            connect: {
              id: updateMissionDto.clientId,
            },
          },
          user: {
            connect: {
              id: updateMissionDto.userId,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  remove(id: number) {
    try {
      return prisma.mission.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
