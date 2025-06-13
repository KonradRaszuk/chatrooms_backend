import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '@app/common/decorators/auth.decorator';
import { AuthType } from '@app/common/enums/auth-type.enum';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { Request, Response } from 'express';
import { ActiveUser } from '../../decorators/active-user.decorator';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Auth(AuthType.None)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authenticationService.signUp(signUpDto);
  }

  @Auth(AuthType.None)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authenticationService.signIn(signInDto);

    this.authenticationService.setRefreshTokenCookie(res, refreshToken);

    return { accessToken };
  }

  @Auth(AuthType.None)
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.authenticationService.refreshTokens(refreshToken);

    this.authenticationService.setRefreshTokenCookie(res, newRefreshToken);

    return { accessToken: newAccessToken };
  }

  @Get('me')
  async me(@ActiveUser() user: ActiveUserData) {
    return {
      id: user.sub,
      email: user.email,
      nick: user.nick,
    };
  }
}
