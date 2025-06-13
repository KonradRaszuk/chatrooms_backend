import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Undefinable } from '@app/common/types/undefinable.type';
import { CreateUserInput } from '../models/create-user.input';
import { FindOneUserQuery } from '../models/find-one-user.type';
import { UserModel } from '../models/user.model';
import { mapUserEntityToUserModel } from './mappers/map-user-entity-to-user-model.mapper';

@Injectable()
export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneUser(query: FindOneUserQuery): Promise<Undefinable<UserModel>> {
    const user = await this.usersRepository.findOne({ where: { ...query } });

    return mapUserEntityToUserModel(user);
  }

  async findUserById(id: string): Promise<Undefinable<UserModel>> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return mapUserEntityToUserModel(user);
  }
  async createUser(createUserInput: CreateUserInput): Promise<UserModel> {
    const entity = this.usersRepository.create({
      ...createUserInput,
    });

    const user = await this.usersRepository.save(entity);

    return mapUserEntityToUserModel(user);
  }
}
