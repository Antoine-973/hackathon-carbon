import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Public } from 'src/authentication/decorators/public.decorator';
import { Role } from './role.enum';
import { Roles } from './role/decorator/roles.decorator';
import { RolesGuard } from './role/guard/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  //EXEMPLE ACCES ADMIN ONLY @UseGuards(JwtAuthGuard, new RolesGuard(Role.Admin))
  @Get()
  findAll() {
    return this.userService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id/password')
  updatePassword(@Param('id') id: string, @Body() body: any) {
    return this.userService.updatePassword(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
