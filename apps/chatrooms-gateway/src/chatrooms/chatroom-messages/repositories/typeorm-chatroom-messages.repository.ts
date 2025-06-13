import { Injectable } from '@nestjs/common';
import { ChatroomMessagesRepository } from './chatroom-messages.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatroomMessage } from '../entities/chatroom-message.entity';
import { Repository } from 'typeorm';
import { ChatroomMessageModel } from '../models/chatroom-message.model';
import { CreateChatroomMessageInput } from '../models/create-chatroom-message.input';
import { FindChatroomMessagesQuery } from '../models/find-chatroom-messages-query.type';
import { mapChatroomMessageEntityToChatroomMessageModel } from './mappers/map-chatroom-message-entity-to-chatroom-message-model';

@Injectable()
export class TypeormChatroomMessagesRepository
  implements ChatroomMessagesRepository
{
  constructor(
    @InjectRepository(ChatroomMessage)
    private readonly chatroomMessagesRepository: Repository<ChatroomMessage>,
  ) {}

  async createChatroomMessage(
    createChatroomMessageInput: CreateChatroomMessageInput,
  ): Promise<ChatroomMessageModel> {
    const entity = this.chatroomMessagesRepository.create({
      ...createChatroomMessageInput,
    });

    const chatroomMessage = await this.chatroomMessagesRepository.save(entity);

    const createdMessage = await this.chatroomMessagesRepository.findOne({
      where: { id: chatroomMessage.id },
    });

    return mapChatroomMessageEntityToChatroomMessageModel(createdMessage);
  }

  async getChatroomMessages(
    findChatroomMessagesQuery: FindChatroomMessagesQuery,
  ): Promise<ChatroomMessageModel[]> {
    const data = await this.chatroomMessagesRepository.find({
      where: { ...findChatroomMessagesQuery },
    });

    return data.map((chatroomMessage) =>
      mapChatroomMessageEntityToChatroomMessageModel(chatroomMessage),
    );
  }
}
