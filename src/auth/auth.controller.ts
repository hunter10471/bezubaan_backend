import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './../user/dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() data: CreateUserDto) {
    return await this.authService.signup(data);
  }
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.authService.login(data);
  }
}
