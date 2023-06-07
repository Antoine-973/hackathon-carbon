import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaClient} from '@prisma/client'
import {CreateTopicDto} from "./dto/create-topic.dto";
import {UpdateTopicDto} from "./dto/update-topic.dto";

const prisma = new PrismaClient()

@Injectable()
export class TopicService {

    create(createTopicDto: CreateTopicDto) {
        try {
            return prisma.topic.create({
                data: {
                    title: createTopicDto.title,
                    content: createTopicDto.content,
                    note: createTopicDto.note,
                    client: {
                        connect: {
                            id: createTopicDto.clientId
                        }
                    },
                    createdBy: {
                        connect: {
                            id: createTopicDto.createdBy
                        }
                    }
                }
            })
        } catch (e) {
            return e;
        }
    }

    findAll() {
        return prisma.topic.findMany().then((data) => {
            return data;
        }).catch((err) => {
            return err;
        });
    }

    findOne(id: number) {
        try {
            return prisma.topic.findUnique({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return e;
        }
    }

    update(id: number, updateTopicDto: UpdateTopicDto) {
        try {
            return prisma.topic.update({
                where: {
                    id: id
                },
                data: {
                    title: updateTopicDto.title,
                    content: updateTopicDto.content,
                    note: updateTopicDto.note,
                    client: {
                        connect: {
                            id: updateTopicDto.clientId
                        }
                    }
                }
            })
        } catch (e) {
            return e;
        }
    }

    remove(id: number) {
        try {
            return prisma.topic.delete({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return e;
        }
    }
}
