import { Module } from '@nestjs/common';
import { UsersCoreModule } from './users-core/users-core.module';

@Module({
  imports: [UsersCoreModule],
})
export class UsersModule {}
