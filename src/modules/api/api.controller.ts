import {
  Controller,
  Get,
  UseGuards,
  Request,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiService } from './api.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmailService } from '../email/email.service';
import { UserDto } from '../user/dto/user.dto';

@ApiTags('Jokes')
@Controller('jokes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ApiController {
  private logger = new Logger(ApiController.name);
  constructor(
    private apiService: ApiService,
    private emailService: EmailService,
  ) {}
  @ApiOperation({
    summary: 'Retrieve a random Chuck Norris joke',
    description:
      'Requires a bearer token in the headers. The token can be obtained by signing in with valid credentials.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a random Chuck Norris joke',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid credentials',
  })
  @Get('random')
  async getRandomJoke(@Request() req: { user: UserDto }) {
    try {
      this.logger.log('Retrieving a random joke');
      const joke = await this.apiService.getRandomJoke();
      const name = req.user.firstName;
      const email = req.user.email;

      const emailResult = await this.emailService.sendUserJoke(
        email,
        joke,
        name,
      );
      this.logger.log('Successfully retrieved a random joke');
      this.logger.log('Sending email to: ' + email);
      return { joke, emailMessage: emailResult.message, email };
    } catch (error) {
      this.logger.error('Failed to fetch a random joke:', error);
      throw new ForbiddenException('Invalid credentials!', error);
    }
  }
}
