import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatroomsManagementService } from '../services/chatrooms-management.service';
import { CreateChatroomResponseDto } from './dtos/create-chatroom-response.dto';
import { mapChatroomModelToCreateChatroomResponseDto } from './mapper/map-chatroom-model-to-create-chatroom-response-dto.mapper';
import { CreateChatroomDto } from './dtos/create-chatroom.dto';
import { ChatRoomDto } from './dtos/chat-room.dto';
import { mapChatroomModelToChatroomDto } from './mapper/map-chatroom-model-to-chatroom-dto.mapper';
import { IdParamDto } from '@app/common/params/id.params';

@Controller('chatrooms')
export class ChatroomsManagementController {
  constructor(
    private readonly chatroomsManagementService: ChatroomsManagementService,
  ) {}

  @Get()
  async getChatrooms(): Promise<ChatRoomDto[]> {
    const response = await this.chatroomsManagementService.getChatrooms();

    return response.map((chatroom) => mapChatroomModelToChatroomDto(chatroom));
  }

  @Post()
  async createChatroom(
    @Body() createChatroomDto: CreateChatroomDto,
  ): Promise<CreateChatroomResponseDto> {
    const response =
      await this.chatroomsManagementService.createChatroom(createChatroomDto);

    return mapChatroomModelToCreateChatroomResponseDto(response);
  }

  @Delete(':id')
  async deleteChatroom(@Param() { id }: IdParamDto): Promise<void> {
    await this.chatroomsManagementService.deleteChatroom(id);
  }
}
