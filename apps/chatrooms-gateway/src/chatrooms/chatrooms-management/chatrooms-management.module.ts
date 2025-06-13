import { Module } from '@nestjs/common';
import { ChatroomsCoreModule } from '../chatrooms-core/chatrooms-core.module';
import { ChatroomsManagementController } from './controllers/chatrooms-management.controller';
import { ChatroomsManagementService } from './services/chatrooms-management.service';

@Module({
  imports: [ChatroomsCoreModule],
  controllers: [ChatroomsManagementController],
  providers: [ChatroomsManagementService],
})
export class ChatroomsManagementModule {}
