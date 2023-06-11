import {Injectable} from '@nestjs/common';
import {CreateEventDto} from './dto/create-event.dto';
import {UpdateEventDto} from './dto/update-event.dto';
import {PrismaClient} from "@prisma/client";
import {UpdateFormationDto} from "../formation/dto/update-formation.dto";

const prisma = new PrismaClient()

@Injectable()
export class EventsService {

    create(createEventDto: CreateEventDto) {
        try {
            return prisma.event.create({
                data: {
                    ...createEventDto,
                    participants: {
                        create: []
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    findAll() {
        try {
            return prisma.event.findMany();
        } catch (error) {
            console.error(error);
        }
    }

    findOne(id: number) {
        try {
            return prisma.event.findUnique({
                where: {
                    id: id
                },
                include: {
                    participants: true
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async update(id: number, updateEventDto: UpdateEventDto) {
        try {
            return prisma.event.update({
                where: {
                    id: id
                },
                data: {
                    description: updateEventDto.description,
                    date: updateEventDto.date,
                    title: updateEventDto.title,
                    participants: {
                        connect: updateEventDto.participants.map((participant) => {
                            return {id: participant};

                        })
                    }
                }
            });

        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    }

    async join(id: number, updateEventDto: UpdateEventDto) {
        try {
            return await prisma.event.update({
                where: {id: id},
                data: {
                    participants: {
                        connect: updateEventDto.participants.map(
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

    async leave(id: number, updateEventDto: UpdateEventDto) {
        try {
            return await prisma.event.update({
                where: {id: id},
                data: {
                    participants: {
                        disconnect: updateEventDto.participants.map(
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