import { Module } from '@nestjs/common';
import { ChatroomsCoreModule } from './chatrooms-core/chatrooms-core.module';
import { ChatroomsManagementModule } from './chatrooms-management/chatrooms-management.module';
import { ChatroomMessagesModule } from './chatroom-messages/chatroom-messages.module';
import { ChatroomWebsocketsModule } from './chatroom-websockets/chatroom-websockets.module';

@Module({
  imports: [
    ChatroomsCoreModule,
    ChatroomsManagementModule,
    ChatroomMessagesModule,
    ChatroomWebsocketsModule,
  ],
})
export class ChatroomsModule {}
