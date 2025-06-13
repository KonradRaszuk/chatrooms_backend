import { IdParamDto } from '@app/common/params/id.params';
import { Controller, Get, Param } from '@nestjs/common';
import { ChatroomMessagesService } from '../services/chatroom-messages.service';
import { mapChatroomMessageModelToChatroomMessageDto } from './mappers/map-chatroom-message-model-to-chatroom-message-dto.mapper';
import { ChatroomMessageDto } from './dtos/chatroom-message.dto';

@Controller('chatroom-messages')
export class ChatroomMessagesController {
  constructor(
    private readonly chatroomMessagesService: ChatroomMessagesService,
  ) {}

  @Get(':id')
  async getChatroomMessages(
    @Param() { id }: IdParamDto,
  ): Promise<ChatroomMessageDto[]> {
    const data = await this.chatroomMessagesService.getChatroomMessages({
      chatroomId: id,
    });

    return data.map((message) =>
      mapChatroomMessageModelToChatroomMessageDto(message),
    );
  }
}
