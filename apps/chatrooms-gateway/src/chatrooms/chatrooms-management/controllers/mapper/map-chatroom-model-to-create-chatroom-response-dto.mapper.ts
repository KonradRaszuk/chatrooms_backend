import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomModel } from '../../../chatrooms-core/models/chatroom.model';

export const mapChatroomModelToCreateChatroomResponseDto = (
  chatroom: ChatroomModel,
): Undefinable<ChatroomModel> => {
  if (!chatroom) {
    return undefined;
  }

  return {
    id: chatroom.id,
    name: chatroom.name,
  };
};
