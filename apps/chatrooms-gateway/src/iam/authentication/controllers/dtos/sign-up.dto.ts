import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ToLowerCase } from '@app/common/decorators/to-lower-case.decorator';

export class SignUpDto {
  @IsEmail()
  @ToLowerCase()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  nick: string;
}
