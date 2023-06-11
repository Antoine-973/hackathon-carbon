import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class VoteService {
    create(createVoteDto: CreateVoteDto) {
        try {

          const data ={
            voter: {
                connect: {
                    id: createVoteDto.voterId,
                }
            }
          } ;

          if (createVoteDto.positiveCommentId) {
            data['positiveComment'] = {
                connect: {
                    id: createVoteDto.positiveCommentId,
                }
            }
          } else if (createVoteDto.negativeCommentId) {
            data['negativeComment'] = {
                connect: {
                    id: createVoteDto.negativeCommentId,
                }
            }
          }

          return prisma.vote.create({
            data: {
             ...data
            },
          }) ;

        } catch (e) {
          return e;
        }
  }
    delete(id: number) {
        try {
            return prisma.vote.delete({
                where: {
                    id: id,
                },
            });
        } catch (e) {
            return e;
        }
    }


}
