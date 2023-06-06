import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import {Pass, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class StageService {
  create(createStageDto: CreateStageDto) {
    try {

        return prisma.stage.create({
            data: {
                title: createStageDto.title,
                description: createStageDto.description,
                position: createStageDto.position,
                pass: {
                    connect: {
                        id: createStageDto.passId
                    }
                }
            }
        });
    }
    catch (error) {
        console.error(error) ;
        return error;
    }
  }

  findAll() {
    try {
      return prisma.stage.findMany({
        include: {
            pass: true,
            rewards: true
        }
      });
    } catch (error) {
      console.error(error) ;
        return error;
    }
  }

  findOne(id: number) {
    try {
        return prisma.stage.findUnique({
            where: {
            id: id
            },
            include: {
                pass: true,
                rewards: true
            }
        });
    } catch (error) {
      console.error(error) ;
      return error;
    }
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    try {
      return prisma.stage.update({
        where: {
            id: id
        }, data: updateStageDto
      });
    } catch (error) {
        console.error(error) ;
        return error;
    }
  }

  remove(id: number) {
    try {
      return prisma.stage.delete({
        where: {
            id: id
        }
      });
    } catch (error) {
      console.error(error) ;
      return error;
    }
  }
}
