import {Injectable} from '@nestjs/common';
import {CreateEventDto} from './dto/create-event.dto';
import {UpdateEventDto} from './dto/update-event.dto';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

@Injectable()
export class EventsService {

  create(createEventDto: CreateEventDto)  {
    try {
      return prisma.event.create({
        data: createEventDto
      });
    } catch (error) {
      console.error(error) ;
    }
  }

  findAll() {
    try {
      return prisma.event.findMany();
    }
    catch (error) {
      console.error(error) ;
    }
  }

  findOne(id: number) {
    try {
      return prisma.event.findUnique({
        where: {
          id: id
        }
      });
    }
    catch (error) {
      console.error(error) ;
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      return prisma.event.update({
        where: {
          id: id
        },
        data: updateEventDto
      });

    } catch (error) {
      console.error(error) ;
    }
  }

  async remove(id: number) {
    try {
      return prisma.event.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.error(error) ;
    }
  }
}