import { Injectable } from '@nestjs/common';
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
  //objet pour postman
  // {
  //   "email": "test@test.com",
  //   "firstname": "Raida",
  //   "lastname": "SADIK",
  //   "role": "Consultant",
  //   "password": "test",
  //   "salary": 3000,
  //   "niveau": 1,
  //   "recruitmentAt": "2021-10-13T09:00:00.000Z"
  //   "missions": [
  //     {
  //       "id": 1,
  //       "name": "Mission 1",
  //       "description": "Description 1",
  //       "startAt": "2021-10-13T09:00:00.000Z",
  //       "endAt": "2021-10-13T09:00:00.000Z",
  //       "createdAt": "2021-10-13T09:00:00.000Z",
  //       "updatedAt": "2021-10-13T09:00:00.000Z",
  //       "userId": 1
  //     }
  //   ],
  //   "formations": ,
  //   "events": ,
  //   "topics": ,
  //   "comments": ,
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        firstname: updateUserDto.firstname,
        lastname: updateUserDto.lastname,
        role: updateUserDto.role,
        password: updateUserDto.password,
        salary: updateUserDto.salary,
        niveau: updateUserDto.niveau,
        recruitmentAt: updateUserDto.recruitmentAt,
        missions: { create: [] },
        formations: { create: [] },
        events: { create: [] },
        topics: { create: [] },
        comments: { create: [] },
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Find all users
   *
   * @returns {Promise[User]} All users
   */
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
