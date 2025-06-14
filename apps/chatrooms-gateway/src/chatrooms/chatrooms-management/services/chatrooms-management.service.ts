import { CreateChatroomInput } from './../../chatrooms-core/models/create-chatroom.input';
import { Injectable } from '@nestjs/common';
import { ChatroomsService } from '../../chatrooms-core/services/chatrooms.service';

@Injectable()
export class ChatroomsManagementService {
  constructor(private readonly chatroomsService: ChatroomsService) {}

  async createChatroom(createChatroomInput: CreateChatroomInput) {
    return this.chatroomsService.createChatroom(createChatroomInput);
  }

  async getChatrooms() {
    return this.chatroomsService.getChatrooms();
  }

  async deleteChatroom(id: string): Promise<void> {
    return this.chatroomsService.deleteChatroom(id);
  }
}
