import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChatroomsManagementService } from '../services/chatrooms-management.service';
import { CreateChatroomResponseDto } from './dtos/create-chatroom-response.dto';
import { mapChatroomModelToCreateChatroomResponseDto } from './mapper/map-chatroom-model-to-create-chatroom-response-dto.mapper';
import { CreateChatroomDto } from './dtos/create-chatroom.dto';
import { ChatRoomDto } from './dtos/chat-room.dto';
import { mapChatroomModelToChatroomDto } from './mapper/map-chatroom-model-to-chatroom-dto.mapper';
import { IdParamDto } from '@app/common/params/id.params';
import { UpdateChatroomResponseDto } from './dtos/update-chatroom-response.dto';
import { mapChatroomModelToUpdateChatroomResponseDto } from './mapper/map-chatroom-model-to-update-chatroom-response-dto.mapper';

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

  @Patch(':id')
  async updateChatroom(
    @Param() { id }: IdParamDto,
    @Body() body: CreateChatroomDto,
  ): Promise<UpdateChatroomResponseDto> {
    const response = await this.chatroomsManagementService.updateChatroom({
      id,
      ...body,
    });
    return mapChatroomModelToUpdateChatroomResponseDto(response);
  }
}
