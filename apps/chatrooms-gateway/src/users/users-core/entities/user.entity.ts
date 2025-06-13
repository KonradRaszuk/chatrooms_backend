import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/database';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'text' })
  nick: string;
}
