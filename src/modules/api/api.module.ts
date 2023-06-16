import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [HttpModule, AuthModule, EmailModule],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
