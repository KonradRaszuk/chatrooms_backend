import { Undefinable } from '@app/common/types/undefinable.type';
import { User } from '../../entities/user.entity';
import { UserModel } from '../../models/user.model';

export const mapUserEntityToUserModel = (
  user: User,
): Undefinable<UserModel> => {
  if (!user) {
    return undefined;
  }

  return {
    email: user.email,
    id: user.id,
    password: user.password,
    nick: user.nick,
  };
};
