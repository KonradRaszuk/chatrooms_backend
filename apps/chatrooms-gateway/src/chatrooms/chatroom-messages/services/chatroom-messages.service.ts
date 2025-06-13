import { Injectable } from '@nestjs/common';
import { ChatroomMessagesRepository } from '../repositories/chatroom-messages.repository';
import { CreateChatroomMessageInput } from '../models/create-chatroom-message.input';
import { ChatroomMessageModel } from '../models/chatroom-message.model';
import { FindChatroomMessagesQuery } from '../models/find-chatroom-messages-query.type';

@Injectable()
export class ChatroomMessagesService {
  constructor(
    private readonly chatroomMessagesRepository: ChatroomMessagesRepository,
  ) {}

  async createChatroomMessage(
    createChatroomMessageInput: CreateChatroomMessageInput,
  ): Promise<ChatroomMessageModel> {
    return this.chatroomMessagesRepository.createChatroomMessage(
      createChatroomMessageInput,
    );
  }

  async getChatroomMessages(
    findChatroomMessagesQuery: FindChatroomMessagesQuery,
  ): Promise<ChatroomMessageModel[]> {
    return this.chatroomMessagesRepository.getChatroomMessages(
      findChatroomMessagesQuery,
    );
  }
}
