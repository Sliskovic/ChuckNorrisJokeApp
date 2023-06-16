import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

export abstract class AbstractUserRepositoryService {
  abstract getAllUsers(): Promise<UserEntity[]>;
  abstract getUserById(id: number): Promise<UserEntity>;
  abstract getUserByEmail(email: string): Promise<UserEntity>;
  abstract updateUser(id: number, userDto: UserDto): Promise<UserEntity>;
  abstract deleteUser(id: number): Promise<string>;
}
