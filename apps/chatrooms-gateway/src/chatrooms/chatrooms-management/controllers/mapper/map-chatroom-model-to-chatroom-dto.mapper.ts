import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomModel } from '../../../chatrooms-core/models/chatroom.model';
import { ChatRoomDto } from '../dtos/chat-room.dto';

export const mapChatroomModelToChatroomDto = (
  chatroom: ChatroomModel,
): Undefinable<ChatRoomDto> => {
  if (!chatroom) {
    return undefined;
  }

  return {
    id: chatroom.id,
    name: chatroom.name,
  };
};
