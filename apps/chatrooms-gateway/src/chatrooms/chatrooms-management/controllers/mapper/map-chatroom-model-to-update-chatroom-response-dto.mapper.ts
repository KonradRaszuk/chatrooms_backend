import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomModel } from '../../../chatrooms-core/models/chatroom.model';
import { UpdateChatroomResponseDto } from '../dtos/update-chatroom-response.dto';

export const mapChatroomModelToUpdateChatroomResponseDto = (
  chatroom: ChatroomModel,
): Undefinable<UpdateChatroomResponseDto> => {
  if (!chatroom) {
    return undefined;
  }

  return {
    id: chatroom.id,
    name: chatroom.name,
  };
};
