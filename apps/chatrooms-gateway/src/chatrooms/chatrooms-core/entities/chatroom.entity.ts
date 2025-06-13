import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/database';

@Entity('chatrooms')
export class Chatroom extends BaseEntity {
  @Column({ type: 'text' })
  name: string;
}
