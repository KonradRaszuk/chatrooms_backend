import { Undefinable } from '@app/common/types/undefinable.type';
import { Chatroom } from '../../entities/chatroom.entity';
import { ChatroomModel } from '../../models/chatroom.model';

export const mapChatroomEntityToChatroomModel = (
  chatroom: Chatroom,
): Undefinable<ChatroomModel> => {
  if (!chatroom) {
    return undefined;
  }

  return {
    id: chatroom.id,
    name: chatroom.name,
  };
};
