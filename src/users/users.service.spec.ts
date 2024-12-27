import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const dto: CreateUserDto = {
        name: '太朗',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = {
            id: 1,
            ...dto,
          };
          return user;
        });

      expect(service.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });

  describe('findAll()', () => {
    it('should return users', () => {
      const user: User = {
        id: 1,
        name: '太朗',
      };

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [user];
      });

      expect(service.findAll()).resolves.toEqual([user]);
    });

    it('should return empty array by Not found users', () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [];
      });

      expect(service.findAll()).resolves.toEqual([]);
    });
  });

  describe('findOne()', () => {
    it('should return user', () => {
      const user: User = {
        id: 1,
        name: '太朗',
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return user;
      });

      expect(service.findOne(1)).resolves.toEqual(user);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(service.findOne(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
