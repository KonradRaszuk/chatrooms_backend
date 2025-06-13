import { ChatroomMessageModel } from '../models/chatroom-message.model';
import { CreateChatroomMessageInput } from '../models/create-chatroom-message.input';
import { FindChatroomMessagesQuery } from '../models/find-chatroom-messages-query.type';

export abstract class ChatroomMessagesRepository {
  abstract createChatroomMessage(
    createChatroomMessageInput: CreateChatroomMessageInput,
  ): Promise<ChatroomMessageModel>;

  abstract getChatroomMessages(
    findChatroomMessagesQuery: FindChatroomMessagesQuery,
  ): Promise<ChatroomMessageModel[]>;
}
