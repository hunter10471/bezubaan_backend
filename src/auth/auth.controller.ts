import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, SignUpVetDto, SignupUserDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { UserType } from 'src/common/enums';
import { Vet } from 'src/vet/entities/vet.entity';

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
  @Post('signup-user')
  async signupUser(@Body() data: SignupUserDto) {
    return await this.authService.signup(data, UserType.USER);
  }

  @ApiOperation({ summary: 'Sign up a vet' })
  @ApiResponse({
    status: 200,
    description: 'Vet created',
    type: User,
  })
  @ApiResponse({ status: 409, description: 'Vet already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('signup-vet')
  async signupVet(@Body() data: SignUpVetDto) {
    return await this.authService.signup(data, UserType.VET);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User does not exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('login-user')
  async loginUser(@Body() data: LoginUserDto) {
    return await this.authService.login(data, UserType.USER);
  }

  @ApiOperation({ summary: 'Login a vet' })
  @ApiResponse({
    status: 200,
    description: 'Vet logged in',
    type: Vet,
  })
  @ApiResponse({ status: 404, description: 'Vet does not exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('login-vet')
  async loginVet(@Body() data: LoginUserDto) {
    return await this.authService.login(data, UserType.VET);
  }
}
