import { Socket } from 'socket.io';
import { WsAccessTokenGuard } from '../guards/access-token/ws-access-token.guard';

export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return (client, next) => {
    try {
      WsAccessTokenGuard.validateToken(client);
      next();
    } catch (error) {
      next(error);
    }
  };
};
