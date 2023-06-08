import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateFormationDto} from './dto/create-formation.dto';
import {UpdateFormationDto} from './dto/update-formation.dto';
import {PrismaClient} from '@prisma/client'
import {JoinFormationDto} from "./dto/join-formation.dto";

const prisma = new PrismaClient()

@Injectable()
export class FormationService {

    create(createFormationDto: CreateFormationDto) {
        try {
            return prisma.formation.create({
                data: {
                    title: createFormationDto.title,
                    description: createFormationDto.description,
                    date: createFormationDto.date,
                }
            })
        } catch (e) {
            return e;
        }
    }

    findAll() {
        return prisma.formation.findMany({
            include: {
                participants: {
                    select: {
                        firstname: true,
                        lastname: true,
                    }
                }
            }
        }).then((data) => {
            return data;
        }).catch((err) => {
            return err;
        });
    }

    findOne(id: number) {
        try {
            return prisma.formation.findUnique({
                where: {
                    id: id
                }, include: {
                    participants: true
                }
            })
        } catch (e) {
            return e;
        }
    }

    update(id: number, updateFormationDto: UpdateFormationDto) {
        try {
            return prisma.formation.update({
                where: {
                    id: id
                },
                data: {
                    title: updateFormationDto.title,
                    description: updateFormationDto.description,
                    date: updateFormationDto.date,
                    participants: {
                        connect: updateFormationDto.participants.map(
                            id => ({id})
                        )
                    }
                }
            })
        } catch (e) {
            return e;
        }
    }

    remove(id: number) {
        try {
            return prisma.formation.delete({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return e;
        }
    }

    async joinFormation(id: number, updateFormationDto: UpdateFormationDto) {
        try {
            return await prisma.formation.update({
                where: {id: id},
                data: {
                    participants: {
                        connect: updateFormationDto.participants.map(
                            id => ({id})
                        )
                    }
                },
            });
        } catch (e) {
            console.error(e)
            return e;
        }
    }

    async leaveFormation(id: number, updateFormationDto: UpdateFormationDto) {
        try {
            return await prisma.formation.update({
                where: {id: id},
                data: {
                    participants: {
                        disconnect: updateFormationDto.participants.map(
                            id => ({id})
                        )
                    }
                },
            });
        } catch (e) {
            console.error(e)
            return e;
        }
    }
}
