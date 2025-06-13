import { User } from '../../../users/users-core/entities/user.entity';
import { BaseEntity } from '@app/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Chatroom } from '../../chatrooms-core/entities/chatroom.entity';

@Entity('chatroom_messages')
export class ChatroomMessage extends BaseEntity {
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => Chatroom, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'chatroomId' })
  chatroom: Chatroom;

  @Column({ type: 'uuid' })
  chatroomId: string;
}
