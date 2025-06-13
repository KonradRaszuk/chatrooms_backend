import { ChatroomModel } from '../../chatrooms-core/models/chatroom.model';
import { UserModel } from './../../../users/users-core/models/user.model';

export class ChatroomMessageModel {
  constructor(
    public readonly id: string,
    public readonly user: UserModel,
    public readonly chatroom: ChatroomModel,
    public readonly text: string,
  ) {}
}
