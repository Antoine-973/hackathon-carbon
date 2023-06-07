import { Comment, Event, Formation, Mission, Topic } from '@prisma/client';
import { IsEmail } from 'class-validator';

// model User {
//   id            Int         @id @default(autoincrement())
//   email         String      @unique
//   firstname     String
//   lastname      String
//   role          String
//   password      String?
//   salary        Int
//   niveau        Int
//   recruitmentAt DateTime
//   missions      Mission[]
//   formations    Formation[]
//   events        Event[]
//   topics        Topic[]
//   comments      Comment[]
//   createdAt     DateTime    @default(now())
//   updatedAt     DateTime    @updatedAt
//   //mentor User?
// }

//creer selon model prisma

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
}
