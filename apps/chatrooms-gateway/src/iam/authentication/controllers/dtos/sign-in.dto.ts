import { ToLowerCase } from '@app/common/decorators/to-lower-case.decorator';
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ToLowerCase()
  email: string;

  @IsString()
  password: string;
}
