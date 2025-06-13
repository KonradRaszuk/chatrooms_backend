import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { TypeOrmUsersRepository } from './repositories/typeorm-users.repository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingModule } from '@app/hashing';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashingModule],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: TypeOrmUsersRepository },
  ],
  exports: [UsersService],
})
export class UsersCoreModule {}
