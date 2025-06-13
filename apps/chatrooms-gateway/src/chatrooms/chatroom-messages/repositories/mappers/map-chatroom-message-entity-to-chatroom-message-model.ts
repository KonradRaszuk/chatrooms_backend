import { mapUserEntityToUserModel } from './../../../../users/users-core/repositories/mappers/map-user-entity-to-user-model.mapper';
import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomMessage } from '../../entities/chatroom-message.entity';
import { ChatroomMessageModel } from '../../models/chatroom-message.model';
import { mapChatroomEntityToChatroomModel } from '../../../chatrooms-core/repositories/mappers/map-chatroom-entity-to-chat-room-model.mapper';

export const mapChatroomMessageEntityToChatroomMessageModel = (
  chatroomMessage: ChatroomMessage,
): Undefinable<ChatroomMessageModel> => {
  if (!chatroomMessage) {
    return undefined;
  }

  return {
    id: chatroomMessage.id,
    chatroom: mapChatroomEntityToChatroomModel(chatroomMessage.chatroom),
    user: mapUserEntityToUserModel(chatroomMessage.user),
    text: chatroomMessage.text,
  };
};
