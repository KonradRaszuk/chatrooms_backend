import { JwtTokenType } from '../authentication/enums/jwt-token-type.enum';

export interface RefreshTokenData {
  sub: string;
  tokenType: JwtTokenType;
}
