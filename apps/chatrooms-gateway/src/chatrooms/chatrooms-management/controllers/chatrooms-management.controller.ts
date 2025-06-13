import { Body, Controller, Post } from '@nestjs/common';
import { ChatroomsManagementService } from '../services/chatrooms-management.service';
import { CreateChatroomResponseDto } from './dtos/create-chatroom-response.dto';
import { mapChatroomModelToCreateChatroomResponseDto } from './mapper/map-chatroom-model-to-create-chatroom-response-dto.mapper';
import { CreateChatroomDto } from './dtos/create-chatroom.dto';

@Controller('chatrooms')
export class ChatroomsManagementController {
  constructor(
    private readonly chatroomsManagementService: ChatroomsManagementService,
  ) {}

  @Post()
  async createChatroom(
    @Body() createChatroomDto: CreateChatroomDto,
  ): Promise<CreateChatroomResponseDto> {
    const response =
      await this.chatroomsManagementService.createChatroom(createChatroomDto);

    return mapChatroomModelToCreateChatroomResponseDto(response);
  }
}
