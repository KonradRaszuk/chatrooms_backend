import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatroomMessage } from './entities/chatroom-message.entity';
import { ChatroomMessagesService } from './services/chatroom-messages.service';
import { ChatroomMessagesRepository } from './repositories/chatroom-messages.repository';
import { TypeormChatroomMessagesRepository } from './repositories/typeorm-chatroom-messages.repository';
import { ChatroomMessagesController } from './controllers/chatroom-messages.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ChatroomMessage])],
  providers: [
    ChatroomMessagesService,
    {
      provide: ChatroomMessagesRepository,
      useClass: TypeormChatroomMessagesRepository,
    },
  ],
  exports: [ChatroomMessagesService],
  controllers: [ChatroomMessagesController],
})
export class ChatroomMessagesModule {}
