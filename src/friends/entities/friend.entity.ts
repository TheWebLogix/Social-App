import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export type FriendStatus = 'pending' | 'accepted' | 'rejected';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, (u) => u.requestsSent) requester: User;
  @ManyToOne(() => User, (u) => u.requestsReceived) receiver: User;

  @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: FriendStatus;
}