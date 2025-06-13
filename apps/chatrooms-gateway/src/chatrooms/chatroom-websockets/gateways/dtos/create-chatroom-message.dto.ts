import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateChatroomMessageDto {
  @IsUUID()
  chatroomId: string;

  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
