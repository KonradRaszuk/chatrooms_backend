import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateChatroomDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
