import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePassDto} from './dto/create-pass.dto';
import {UpdatePassDto} from './dto/update-pass.dto';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PassService {
    create(createPassDto: CreatePassDto) {
        try {

            const stages = []
            for (let i = 1; i < 101; i++) {
                stages.push({
                    position: i,
                })
            }

            return prisma.pass.create({
                data: {
                    title: createPassDto.title,
                    description: createPassDto.description,
                    startAt: createPassDto.startAt,
                    endAt: createPassDto.endAt,
                    stages: {
                        create: stages
                    }
                },
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    findAll() {
        try {
            return prisma.pass.findMany({
                include: {
                    stages: {
                        include: {
                            rewards: true,
                        },
                    },
                },
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    findOne(id: number) {
        try {
            return prisma.pass.findUnique({
                where: {
                    id: id,
                },
                include: {
                    stages: {
                        include: {
                            rewards: true,
                        },
                    },
                },
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async update(id: number, updatePassDto: UpdatePassDto) {
        try {
            return prisma.pass.update({
                where: {
                    id: id,
                },
                data: updatePassDto,
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async remove(id: number) {
        try {
            return prisma.pass.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
