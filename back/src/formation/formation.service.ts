import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateFormationDto} from './dto/create-formation.dto';
import {UpdateFormationDto} from './dto/update-formation.dto';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class FormationService {

    create(createFormationDto: CreateFormationDto){
        try {
            return prisma.formation.create({
                data: createFormationDto
            })
        } catch (e) {
            return e;
        }
    }

    findAll() {
        return prisma.formation.findMany().then((data) => {
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
                }
            })
        }catch (e){
            return e;
        }
    }

    update(id: number, updateFormationDto: UpdateFormationDto) {
        try {
            return prisma.formation.update({
                where: {
                    id: id
                },
                data: updateFormationDto
            })
        }catch (e){
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
        }catch (e){
            return e;
        }
    }

    addParticipant(id: number, updateFormationDto: UpdateFormationDto) {
        try {
            return prisma.formation.update({
                where: {
                    id: id
                },
                data: updateFormationDto
            })
        }catch (e){
            return e;
        }
    }
}
