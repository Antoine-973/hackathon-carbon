import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePassDto} from './dto/create-pass.dto';
import {UpdatePassDto} from './dto/update-pass.dto';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PassService {
  create(createPassDto: CreatePassDto)  {
    try {
      return prisma.pass.create({
        data: createPassDto
      });
    } catch (error) {
      console.error(error) ;
      return error;
    }
  }

  findAll() {
    try {
        return prisma.pass.findMany();
    }
    catch (error) {
        console.error(error) ;
        return error;
    }
  }

  findOne(id: number) {
    try {
        return prisma.pass.findUnique({
          where: {
            id: id
          }
        }).then((data) => {
            if(!data) throw new NotFoundException(`Pass with id ${id} not found`) ;
        });
    }
    catch (error) {
        console.error(error) ;
        return error;
    }
  }

  async update(id: number, updatePassDto: UpdatePassDto) {
    try {

        return prisma.pass.update({
            where: {
                id: id
            },
            data: updatePassDto
        });

    } catch (error) {
        console.error(error) ;
        return error;
    }
  }

  async remove(id: number) {
    try {
        return prisma.pass.delete({
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
