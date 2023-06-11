import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {User} from "@prisma/client";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user as User;
      return result;
    }
    return null;
  }

  async login({ email, password }: { email: string, password: string }): Promise<{ access_token: string }> {
    const user : User = await this.validateUser(email, password);
    if(!user) throw new Error('User not found');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    user['password'] = undefined;
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
