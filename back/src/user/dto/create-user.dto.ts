import {Comment, Event, Formation, Mission, Topic, Vote} from '@prisma/client';
import {IsEmail} from 'class-validator';

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

  description: string;

  phone: string;

  localisation: string;
}
