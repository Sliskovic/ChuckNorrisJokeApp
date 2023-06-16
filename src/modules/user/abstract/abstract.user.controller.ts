import { Injectable } from '@nestjs/common';

import { AbstractUserRepositoryService } from './abstract.user.repository.service';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export abstract class AbstractUserController {
  constructor(protected userService: AbstractUserRepositoryService) {}

  abstract getAllUsers(): Promise<UserEntity[]>;

  abstract getUserById(id: number): Promise<UserEntity>;

  abstract updateUser(id: number, userDto: UserDto): Promise<UserEntity>;

  abstract deleteUser(id: number): Promise<string>;
}
