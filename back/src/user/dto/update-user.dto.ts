import { Comment, Event, Formation, Mission, Topic } from '@prisma/client';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  firstname?: string;

  @IsOptional()
  lastname?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  salary?: number;

  @IsOptional()
  niveau?: number;

  @IsOptional()
  recruitmentAt?: Date;

  @IsOptional()
  expertise?: string;

  @IsOptional()
  description?: string;

    @IsOptional()
    mentorId?: number;
}
