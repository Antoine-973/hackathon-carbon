import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {UpdateTechnologyDto} from "./dto/update-technology.dto";
import {CreateTechnologyDto} from "./dto/create-technology.dto";

const prisma = new PrismaClient();

@Injectable()
export class TechnologyService {


  create(createTechnologyDto: CreateTechnologyDto) {
    try {
        return prisma.technology.create({
            data: {
                title: createTechnologyDto.title,
                description: createTechnologyDto.description,
            },
        });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  findAll() {
    try {
      return prisma.technology.findMany();
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    try {
      return prisma.technology.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateTechnologyDto: UpdateTechnologyDto) {
    try {
      return prisma.technology.update({
        where: {
          id: id,
        },
        data: updateTechnologyDto,
      });
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    try {
      return prisma.technology.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
