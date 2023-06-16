import { Injectable } from '@nestjs/common';

import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { UserRepositoryService } from './abstract/user.repository.service';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepositoryService) {}

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.getUserByEmail(email);
  }

  async createUser(userDto: UserDto): Promise<UserEntity> {
    return await this.userRepository.createUser(userDto);
  }

  async updateUser(id: number, userDto: UserDto): Promise<UserEntity> {
    return await this.userRepository.updateUser(id, userDto);
  }

  async deleteUser(id: number): Promise<string> {
    return await this.userRepository.deleteUser(id);
  }
}
