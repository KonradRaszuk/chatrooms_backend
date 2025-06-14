import { SocketAuthMiddleware } from '../../../iam/authentication/middlewares/ws.middleware';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { HandleJoinDto } from './dtos/handle-join.dto';
import { Server, Socket } from 'socket.io';
import { ChatroomMessagesService } from '../../chatroom-messages/services/chatroom-messages.service';
import { CreateChatroomMessageDto } from './dtos/create-chatroom-message.dto';
import { ChatroomMessageDto } from '../../chatroom-messages/controllers/dtos/chatroom-message.dto';

@WebSocketGateway({ namespace: '/chatrooms', cors: true })
export class ChatroomGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatroomMessagesService: ChatroomMessagesService,
  ) {}
  afterInit(server: Server) {
    server.use(SocketAuthMiddleware());
  }

  handleDisconnect(client: any) {
    console.log('disconnected');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('connected');
  }

  @SubscribeMessage('joinRoom')
  handleJoin(
    @MessageBody() { chatroomId }: HandleJoinDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatroomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeave(
    @MessageBody() { chatroomId }: { chatroomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(chatroomId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() dto: CreateChatroomMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const chatroomMessage =
      await this.chatroomMessagesService.createChatroomMessage({
        chatroomId: dto.chatroomId,
        text: dto.text,
        userId: dto.userId,
      });

    const payload: ChatroomMessageDto = {
      id: chatroomMessage.id,
      nick: chatroomMessage.user.nick,
      text: chatroomMessage.text,
      userId: chatroomMessage.user.id,
      chatroomId: chatroomMessage.chatroom.id,
    };

    this.server.to(dto.chatroomId).emit('newMessage', payload);
  }
}
