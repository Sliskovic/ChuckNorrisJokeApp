import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractUserRepositoryService } from './abstract.user.repository.service';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

export class UserRepositoryService extends AbstractUserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userDto: UserDto): Promise<UserEntity> {
    const { email, password, firstName, lastName, createdAt } = userDto;
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = password;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.createdAt = createdAt;
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    user.email = userDto.email;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    return await this.userRepository.save(user);
  }
  async deleteUser(id: number): Promise<string> {
    await this.userRepository.delete({ id });
    return 'User deleted successfully!';
  }
}
