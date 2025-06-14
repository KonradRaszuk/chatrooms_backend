import { Injectable } from '@nestjs/common';
import { ChatroomsRepository } from '../repositories/chatrooms.repository';
import { ChatroomModel } from '../models/chatroom.model';
import { Undefinable } from '@app/common/types/undefinable.type';
import { CreateChatroomInput } from '../models/create-chatroom.input';

@Injectable()
export class ChatroomsService {
  constructor(private readonly chatroomsRepository: ChatroomsRepository) {}

  async findChatroomById(id: string): Promise<Undefinable<ChatroomModel>> {
    return this.chatroomsRepository.findChatroomById(id);
  }

  async createChatroom(
    createChatroomInput: CreateChatroomInput,
  ): Promise<ChatroomModel> {
    return this.chatroomsRepository.createChatroom(createChatroomInput);
  }

  async getChatrooms(): Promise<ChatroomModel[]> {
    return this.chatroomsRepository.getChatrooms();
  }

  async deleteChatroom(id: string): Promise<void> {
    return this.chatroomsRepository.deleteChatroom(id);
  }
}
