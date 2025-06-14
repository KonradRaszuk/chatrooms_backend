import { Injectable } from '@nestjs/common';
import { ChatroomsRepository } from './chatrooms.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatroom } from '../entities/chatroom.entity';
import { Repository } from 'typeorm';
import { Undefinable } from '@app/common/types/undefinable.type';
import { ChatroomModel } from '../models/chatroom.model';
import { CreateChatroomInput } from '../models/create-chatroom.input';
import { mapChatroomEntityToChatroomModel } from './mappers/map-chatroom-entity-to-chat-room-model.mapper';
import { UpdateChatroomInput } from '../models/update-chatroom.input';

@Injectable()
export class TypeormChatroomsRepository implements ChatroomsRepository {
  constructor(
    @InjectRepository(Chatroom)
    private readonly chatroomsRepository: Repository<Chatroom>,
  ) {}
  async updateChatroom(
    updateChatroomInput: UpdateChatroomInput,
  ): Promise<ChatroomModel> {
    const { id, ...updateData } = updateChatroomInput;
    const chatroom = await this.chatroomsRepository.preload({
      id,
      ...updateData,
    });

    if (!chatroom) {
      return undefined;
    }

    const updatedChatroom = await this.chatroomsRepository.save(chatroom);
    return mapChatroomEntityToChatroomModel(updatedChatroom);
  }
  async deleteChatroom(id: string): Promise<void> {
    const chatroom = await this.chatroomsRepository.findOne({ where: { id } });

    if (!chatroom) {
      return;
    }

    await this.chatroomsRepository.remove(chatroom);
  }

  async getChatrooms(): Promise<ChatroomModel[]> {
    return this.chatroomsRepository.find();
  }

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

  async getChatroomById(id: string): Promise<ChatroomModel> {
    const chatroom = await this.chatroomsRepository.findOne({ where: { id } });

    return mapChatroomEntityToChatroomModel(chatroom);
  }
}
