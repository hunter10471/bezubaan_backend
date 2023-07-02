import { UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-user-by-id/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: [User],
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-all-users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete('delete-user-by-id/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update by user id' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-user-by-id/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.userService.updateUser(id, data);
  }
}
