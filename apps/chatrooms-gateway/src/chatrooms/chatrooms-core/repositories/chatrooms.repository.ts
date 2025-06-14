import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomModel } from '../models/chatroom.model';
import { CreateChatroomInput } from '../models/create-chatroom.input';
import { UpdateChatroomInput } from '../models/update-chatroom.input';

export abstract class ChatroomsRepository {
  abstract findChatroomById(id: string): Promise<Undefinable<ChatroomModel>>;

  abstract createChatroom(
    createChatroomInput: CreateChatroomInput,
  ): Promise<ChatroomModel>;

  abstract getChatrooms(): Promise<ChatroomModel[]>;

  abstract deleteChatroom(id: string): Promise<void>;

  abstract updateChatroom(
    updateChatroomInput: UpdateChatroomInput,
  ): Promise<ChatroomModel>;

  abstract getChatroomById(id: string): Promise<ChatroomModel>;
}
