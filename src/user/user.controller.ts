import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema'; // Import the DTO
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAllUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('fetchUserById/:id')
  async fetchUserById(@Param('id') id: Types.ObjectId): Promise<User> {
    return this.userService.fetchUserById(id);
  }

  @Patch
  ('updateUserById/:id')
  async updateUserById(
    @Param('id') id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, updateUserDto);
  } 
}
