import { CreateChatroomInput } from './../../chatrooms-core/models/create-chatroom.input';
import { Injectable } from '@nestjs/common';
import { ChatroomsService } from '../../chatrooms-core/services/chatrooms.service';
import { ChatroomModel } from '../../chatrooms-core/models/chatroom.model';
import { UpdateChatroomInput } from '../../chatrooms-core/models/update-chatroom.input';

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

  async updateChatroom(
    updateChatroomInput: UpdateChatroomInput,
  ): Promise<ChatroomModel> {
    return this.chatroomsService.updateChatroom(updateChatroomInput);
  }

  async getChatroomById(id: string): Promise<ChatroomModel> {
    return this.chatroomsService.getChatroomById(id);
  }
}
