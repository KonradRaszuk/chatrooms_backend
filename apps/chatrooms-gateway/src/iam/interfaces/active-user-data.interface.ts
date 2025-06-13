import { JwtTokenType } from '../authentication/enums/jwt-token-type.enum';

export interface ActiveUserData {
  sub: string;
  email: string;
  tokenType: JwtTokenType;
  nick: string;
}
