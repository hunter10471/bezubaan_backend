import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, SignupUserDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a user' })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: User,
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('signup')
  async signup(@Body() data: SignupUserDto) {
    return await this.authService.signup(data);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.authService.login(data);
  }
}
