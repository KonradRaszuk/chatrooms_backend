import { IsUUID } from 'class-validator';

export class HandleJoinDto {
  @IsUUID()
  chatroomId: string;
}
