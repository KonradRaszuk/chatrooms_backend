import { UserModel } from '../../../users/users-core/models/user.model';
import { UsersService } from '../../../users/users-core/services/users.service';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { JwtTokenType } from '../enums/jwt-token-type.enum';
import { SignUpDto } from '../controllers/dtos/sign-up.dto';
import { SignInDto } from '../controllers/dtos/sign-in.dto';
import { HashingService } from '@app/hashing';
import { JwtService } from '@nestjs/jwt';
import authConfig from '../../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenData } from '../../interfaces/refresh-token-data.interface';
import { Response } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const existingUser = await this.usersService.findOneUser({
        email: signUpDto.email,
      });

      if (existingUser) {
        throw new ConflictException();
      }

      return this.usersService.createUser({
        email: signUpDto.email,
        password: signUpDto.password,
        nick: signUpDto.nick,
      });
    } catch (error) {
      throw error;
    }
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.usersService.findOneUser({
      email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isEqual = await this.hashingService.compare(password, user.password);

    if (!isEqual) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(user: UserModel) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.authConfiguration.accessTokenTtl,
        {
          email: user.email,
          tokenType: JwtTokenType.ACCESS,
        },
      ),
      this.signToken<Partial<RefreshTokenData>>(
        user.id,
        this.authConfiguration.refreshTokenTtl,
        {
          tokenType: JwtTokenType.REFRESH,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
        secret: this.authConfiguration.secret,
        expiresIn,
      },
    );
  }

  setRefreshTokenCookie(res: Response, newRefreshToken: string) {
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: this.authConfiguration.refreshTokenTtl * 1000,
    });
  }

  async validateUserSessionOrThrows(payload: ActiveUserData) {
    if (payload.tokenType !== JwtTokenType.ACCESS) {
      throw new UnauthorizedException();
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const { sub, tokenType } =
        await this.jwtService.verifyAsync<RefreshTokenData>(refreshToken, {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        });

      if (tokenType !== JwtTokenType.REFRESH) {
        throw new Error('Invalid token type');
      }

      const user = await this.usersService.findUserByIdOrThrows(sub);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(user);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
