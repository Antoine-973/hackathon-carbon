import { Comment, Event, Formation, Mission, Vote, Topic } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  firstname: string;

  lastname: string;

  role: string;

  password: string;

  salary: number;

  niveau: number;

  recruitmentAt: Date;

  missions: Mission[];

  formations: Formation[];

  events: Event[];

  topics: Topic[];

  comments: Comment[];

  votes: Vote[];

  expertise: string;

  bio: string;
}
