import { Test, TestingModule } from '@nestjs/testing';

import { UserRepositoryService } from '../abstract/user.repository.service';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepositoryService,
          useValue: {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepositoryService>(UserRepositoryService);
  });

  describe('getAllUsers', () => {
    it('should call userRepository.getAllUsers', async () => {
      await userService.getAllUsers();
      expect(userRepository.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should call userRepository.getUserById with the provided id', async () => {
      const id = 1;
      await userService.getUserById(id);
      expect(userRepository.getUserById).toHaveBeenCalledWith(id);
    });
  });
});
