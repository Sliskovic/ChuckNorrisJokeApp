import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { AbstractUserRepositoryService } from './abstract/abstract.user.repository.service';
import { UserRepositoryService } from './abstract/user.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    {
      provide: AbstractUserRepositoryService,
      useClass: UserService,
    },
    UserRepositoryService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
