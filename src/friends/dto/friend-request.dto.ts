import { IsNumber } from 'class-validator';

export class FriendRequestDto {
  @IsNumber() userId: number;
}