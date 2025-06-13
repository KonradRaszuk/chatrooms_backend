import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import authConfig from './config/auth.config';
import { Module } from '@nestjs/common';
import commonConfig from '@app/common/config/common.config';
import { HashingModule } from '@app/hashing';
import { AuthenticationService } from './authentication/services/authentication.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { AuthenticationController } from './authentication/controllers/authentication.controller';
import { UsersCoreModule } from '../users/users-core/users-core.module';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { WsAccessTokenGuard } from './authentication/guards/access-token/ws-access-token.guard';

const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule.forFeature(authConfig)],
  useFactory: (config: ConfigType<typeof authConfig>) => ({
    secret: config.secret,
  }),
  inject: [authConfig.KEY],
});

@Module({
  imports: [
    jwtModule,
    ConfigModule.forFeature(authConfig),
    ConfigModule.forFeature(commonConfig),
    HashingModule,
    UsersCoreModule,
  ],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
