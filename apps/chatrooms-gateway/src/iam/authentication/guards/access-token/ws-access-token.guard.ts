import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

export class WsAccessTokenGuard {
  static validateToken(client: Socket) {
    const { authorization } = client.handshake.headers || {};

    const token: string = authorization.split(' ')[1];

    const payload = verify(token, process.env.JWT_SECRET);

    return payload;
  }
}
