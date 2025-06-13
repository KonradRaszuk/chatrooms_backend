import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatroom } from './entities/chatroom.entity';
import { ChatroomsRepository } from './repositories/chatrooms.repository';
import { TypeormChatroomsRepository } from './repositories/typeorm-chatroom.repository';
import { ChatroomsService } from './services/chatrooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom])],
  providers: [
    ChatroomsService,
    { provide: ChatroomsRepository, useClass: TypeormChatroomsRepository },
  ],
  exports: [ChatroomsService],
})
export class ChatroomsCoreModule {}
