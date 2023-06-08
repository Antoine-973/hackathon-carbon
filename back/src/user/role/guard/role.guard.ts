import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private role: Role,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const currentUser = context.switchToHttp().getRequest().user ?? null;

    if (this.role === currentUser.role) {
      return true;
    }

    throw new ForbiddenException('Unauthorized');  
  }
}


