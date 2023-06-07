import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

const prisma = new PrismaClient();

@Injectable()
export class ClientService {
  create(createClientDto: CreateClientDto) {
    try {
      return prisma.client.create({
        data: createClientDto,
      });
    } catch (e) {
      return e;
    }
  }

  findAll() {
    try {
      return prisma.client.findMany();
    } catch (e) {
      return e;
    }
  }

  findOne(id: number) {
    try {
      return prisma.client.findUnique({
        where: {
          id: id,
        },
        include: {
          missions: true,
        },
      });
    } catch (e) {
      return e;
    }
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    try {
      return prisma.client.update({
        where: {
          id: id,
        },
        data: updateClientDto,
      });
    } catch (e) {
      return e;
    }
  }

  remove(id: number) {
    try {
      return prisma.client.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return e;
    }
  }
}
