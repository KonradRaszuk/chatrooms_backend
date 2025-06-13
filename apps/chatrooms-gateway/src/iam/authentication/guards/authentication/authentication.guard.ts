import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from '@app/common/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '@app/common/decorators/auth.decorator';
import { WsAccessTokenGuard } from '../access-token/ws-access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: [this.accessTokenGuard],
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    let error = new UnauthorizedException();

    for (const type of authTypes) {
      const guardOrArray = this.authTypeGuardMap[type];

      const guards: CanActivate[] = Array.isArray(guardOrArray)
        ? guardOrArray
        : [guardOrArray];

      let allPassed = true;

      for (const guardInstance of guards) {
        try {
          const passed = await Promise.resolve(
            guardInstance.canActivate(context),
          );

          if (!passed) {
            allPassed = false;
            break;
          }
        } catch (err) {
          error = err;
          allPassed = false;
          break;
        }
      }

      if (allPassed) {
        return true;
      }
    }

    throw error;
  }
}
