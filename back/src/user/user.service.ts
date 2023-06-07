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
        niveau: 1,
        recruitmentAt: new Date(),
        missions: { create: [] },
        formations: { create: [] },
        events: { create: [] },
        topics: { create: [] },
        comments: { create: [] },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        firstname: updateUserDto.firstname,
        lastname: updateUserDto.lastname,
        role: updateUserDto.role,
        password: await bcrypt.hash(updateUserDto.password, 10),
        salary: updateUserDto.salary,
        niveau: updateUserDto.niveau,
        recruitmentAt: updateUserDto.recruitmentAt,
      },
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
    return this.prisma.user.findMany();
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
    });
  }
}
