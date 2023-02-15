import { UpdateUserDto } from './dto/user.dto';
import { IUser } from './interface/user.interface';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<IUser> {
    return await this.userService.getUser({ username });
  }
  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers();
  }
  @Delete(':username')
  async deleteUser(@Param('username') username: string): Promise<IUser> {
    return await this.userService.deleteUser({ username });
  }
  @Patch()
  async updateUser(@Body() data: UpdateUserDto): Promise<IUser> {
    return await this.userService.updateUser(data);
  }
}
