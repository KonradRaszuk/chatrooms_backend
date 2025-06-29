import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomModel } from '../../../chatrooms-core/models/chatroom.model';
import { CreateChatroomResponseDto } from '../dtos/create-chatroom-response.dto';

export const mapChatroomModelToCreateChatroomResponseDto = (
  chatroom: ChatroomModel,
): Undefinable<CreateChatroomResponseDto> => {
  if (!chatroom) {
    return undefined;
  }

  return {
    id: chatroom.id,
    name: chatroom.name,
  };
};
