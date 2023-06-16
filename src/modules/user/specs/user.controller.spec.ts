import * as bcrypt from 'bcrypt';

import { UserRepositoryService } from '../abstract/user.repository.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserEntity } from '../entity/user.entity';

describe('UserController', () => {
  let userService: UserService;
  let userRepository: UserRepositoryService;
  let userController: UserController;

  beforeEach(() => {
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });
  describe('getAllUsers', () => {
    it('should return array of users', async () => {
      const users: UserEntity[] = [
        {
          id: 1,
          email: 'user1@example.com',
          password: 'password1',
          firstName: 'User 1',
          lastName: 'Last 1',
          createdAt: new Date(),
          setPassword: async function (password: string): Promise<void> {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(password || this.password, salt);
          },
        },
      ];
      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(users);

      const result = await userController.getAllUsers();

      // expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });
});
