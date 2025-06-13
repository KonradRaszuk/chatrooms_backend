import { Module } from '@nestjs/common';
import { ChatroomGateway } from './gateways/chatroom.gateway';
import { ChatroomMessagesModule } from '../chatroom-messages/chatroom-messages.module';

@Module({
  imports: [ChatroomMessagesModule],
  providers: [ChatroomGateway],
})
export class ChatroomWebsocketsModule {}
