import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates User
   *
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>} Promise User Created
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        role: createUserDto.role,
        password: await bcrypt.hash(createUserDto.password, 10),
        salary: createUserDto.salary,
        niveau: 0,
        recruitmentAt: new Date(),
        missions: { create: [] },
        formations: { create: [] },
        events: { create: [] },
        topics: { create: [] },
        comments: { create: [] },
        votes: { create: [] },
        technologies: { create: [] },
        expertise: createUserDto.expertise,
        description: createUserDto.description,
        phone: createUserDto.phone,
        localisation: createUserDto.localisation,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        mentor: true,
        missions: {
            include: {
              client: true,
            }
        },
        formations: true,
        events: true,
        topics: true,
        votes: true,
        comments: true,
        technologies: true,
      }
    });
  }
  

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const data = {}
    if(updateUserDto.firstname) data['firstname'] = updateUserDto.firstname
    if(updateUserDto.lastname) data['lastname'] = updateUserDto.lastname
    if(updateUserDto.role) data['role'] = updateUserDto.role
    if(updateUserDto.salary) data['salary'] = updateUserDto.salary
    if(updateUserDto.niveau) data['niveau'] = updateUserDto.niveau
    if(updateUserDto.recruitmentAt) data['recruitmentAt'] = updateUserDto.recruitmentAt
    if(updateUserDto.expertise) data['expertise'] = updateUserDto.expertise
    if(updateUserDto.description) data['description'] = updateUserDto.description
    if(updateUserDto.password) data['password'] = await bcrypt.hash(updateUserDto.password, 10)
    if(updateUserDto.mentorId) data['mentor'] = { connect: { id: updateUserDto?.mentorId } }


    return this.prisma.user.update({
      where: {
        id,
      },
      data: data
    });
  }

  async updatePassword(id: number, { currentPassword, newPassword }) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } else if (!(await bcrypt.compare(currentPassword, user.password))) {
      throw new NotFoundException(`Current password is incorrect`);
    } else {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: await bcrypt.hash(newPassword, 10),
        },
      });
    }
  }
  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        missions: true,
        technologies: true,
      }
    });
  }

  /**
   * Get a specific user by Email
   *
   * @param email
   * @returns {Promise<User | undefined>} Found User, or undefined if user doesn't exists
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        missions: true,
        technologies: true,
        formations: true,
        events: true,
      }
    });
  }
}
