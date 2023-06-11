import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {CreateDocumentDto} from "./dto/create-document.dto";
import {UpdateDocumentDto} from "./dto/update-document.dto";

const prisma = new PrismaClient();

@Injectable()
export class DocumentsService {
  create(createDocumentDto: CreateDocumentDto) {
    try {
      return prisma.documents.create({
        data: createDocumentDto,
      });
    } catch (e) {
      return e;
    }
  }

  findAll() {
    try {
      return prisma.documents.findMany();
    } catch (e) {
      return e;
    }
  }

  findOne(id: number) {
    try {
      return prisma.documents.findUnique({
        where: {
          id: id,
        }
      });
    } catch (e) {
      return e;
    }
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    try {
      return prisma.documents.update({
        where: {
          id: id,
        },
        data: updateDocumentDto,
      });
    } catch (e) {
      return e;
    }
  }

  remove(id: number) {
    try {
      return prisma.documents.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return e;
    }
  }
}
