import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Friend } from '../../friends/entities/friend.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column({ nullable: true }) bio: string;

  @OneToMany(() => Friend, (f) => f.requester) requestsSent: Friend[];
  @OneToMany(() => Friend, (f) => f.receiver) requestsReceived: Friend[];
}