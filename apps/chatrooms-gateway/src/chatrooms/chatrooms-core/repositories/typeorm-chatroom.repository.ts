import { Injectable } from '@nestjs/common';
import { ChatroomsRepository } from './chatrooms.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatroom } from '../entities/chatroom.entity';
import { Repository } from 'typeorm';
import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomModel } from '../models/chatroom.model';
import { CreateChatroomInput } from '../models/create-chatroom.input';
import { mapChatroomEntityToChatroomModel } from './mappers/map-chatroom-entity-to-chat-room-model.mapper';

@Injectable()
export class TypeormChatroomsRepository implements ChatroomsRepository {
  constructor(
    @InjectRepository(Chatroom)
    private readonly chatroomsRepository: Repository<Chatroom>,
  ) {}

  async findChatroomById(id: string): Promise<Undefinable<ChatroomModel>> {
    const chatroom = await this.chatroomsRepository.findOne({ where: { id } });

    return mapChatroomEntityToChatroomModel(chatroom);
  }

  async createChatroom(
    createChatroomInput: CreateChatroomInput,
  ): Promise<ChatroomModel> {
    const entity = this.chatroomsRepository.create({
      ...createChatroomInput,
    });

    const user = await this.chatroomsRepository.save(entity);

    return mapChatroomEntityToChatroomModel(user);
  }
}
