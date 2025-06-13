import { Undefinable } from '@app/common/types/undefinable.type';
import { UserModel } from '../models/user.model';
import { FindOneUserQuery } from '../models/find-one-user.type';
import { CreateUserInput } from '../models/create-user.input';

export abstract class UsersRepository {
  abstract findOneUser(
    query: FindOneUserQuery,
  ): Promise<Undefinable<UserModel>>;

  abstract findUserById(id: string): Promise<Undefinable<UserModel>>;

  abstract createUser(createUserInput: CreateUserInput): Promise<UserModel>;
}
