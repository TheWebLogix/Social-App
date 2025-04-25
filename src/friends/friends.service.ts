import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Friend } from "./entities/friend.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private repo: Repository<Friend>,
    private usersService: UsersService,
  ) {}

  async sendRequest(requesterId: number, receiverId: number) {
    if (requesterId === receiverId) throw new BadRequestException('Cannot friend yourself');
    const existing = await this.repo.findOne({ where: [
      { requester: { id: requesterId }, receiver: { id: receiverId } },
      { requester: { id: receiverId }, receiver: { id: requesterId } },
    ]});
    if (existing) throw new BadRequestException('Request already exists');

    const requester = await this.usersService.findById(requesterId);
    const receiver = await this.usersService.findById(receiverId);
    if (!receiver) throw new NotFoundException('Receiver not found');

    const fr = this.repo.create({ requester, receiver, status: 'pending' });
    return this.repo.save(fr);
  }

  async respond(requestId: number, userId: number, accept: boolean) {
    const fr = await this.repo.findOne({ where: { id: requestId }, relations: ['receiver'] });
    if (!fr) throw new NotFoundException('Request not found');
    if (fr.receiver.id !== userId) throw new BadRequestException('Not authorized');

    fr.status = accept ? 'accepted' : 'rejected';
    return this.repo.save(fr);
  }

  async listFriends(userId: number) {
    const sent = await this.repo.find({ where: { requester: { id: userId }, status: 'accepted' }, relations: ['receiver'] });
    const received = await this.repo.find({ where: { receiver: { id: userId }, status: 'accepted' }, relations: ['requester'] });
    const friends = [
      ...sent.map((f) => f.receiver),
      ...received.map((f) => f.requester),
    ];
    return friends;
  }

  async listRequests(userId: number) {
    return this.repo.find({ where: { receiver: { id: userId }, status: 'pending' }, relations: ['requester'] });
  }
}