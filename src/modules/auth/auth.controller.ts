import {
  Body,
  ConflictException,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from './public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Public()
  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Post('sing-up')
  async signUp(@Body() userDto: UserDto) {
    try {
      this.logger.log('Registering a new user');
      return await this.userService.createUser(userDto);
    } catch (error) {
      throw new ConflictException('Email already exists');
    }
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: SignInDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async signIn(@Body() signInDto: SignInDto) {
    try {
      this.logger.log('Logging in a user');
      return await this.authService.signIn(signInDto);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
