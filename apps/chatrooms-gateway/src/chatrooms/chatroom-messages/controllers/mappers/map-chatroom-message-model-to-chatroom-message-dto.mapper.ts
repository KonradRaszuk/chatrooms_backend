import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomMessageModel } from '../../models/chatroom-message.model';
import { ChatroomMessageDto } from '../dtos/chatroom-message.dto';

export const mapChatroomMessageModelToChatroomMessageDto = (
  chatroomMessage: ChatroomMessageModel,
): Undefinable<ChatroomMessageDto> => {
  if (!chatroomMessage) {
    return undefined;
  }

  return {
    id: chatroomMessage.id,
    nick: chatroomMessage.user.nick,
    text: chatroomMessage.text,
  };
};
