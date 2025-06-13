import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { HashingService } from '@app/hashing';
import { FindOneUserQuery } from '../models/find-one-user.type';
import { UserModel } from '../models/user.model';
import { CreateUserInput } from '../models/create-user.input';
import { Undefinable } from '@app/common/types/undefinable.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
  ) {}

  async findOneUserOrThrows(query: FindOneUserQuery): Promise<UserModel> {
    const user = await this.usersRepository.findOneUser({ ...query });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findUserByIdOrThrows(id: string): Promise<UserModel> {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(input: CreateUserInput): Promise<UserModel> {
    const hashedPassword = await this.hashingService.hash(input.password);

    const user = await this.usersRepository.createUser({
      ...input,
      password: hashedPassword,
    });

    return user;
  }

  async findOneUser(query: FindOneUserQuery): Promise<Undefinable<UserModel>> {
    const user = await this.usersRepository.findOneUser({ ...query });

    return user;
  }
}
