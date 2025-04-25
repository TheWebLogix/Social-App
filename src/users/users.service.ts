import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async getProfile(id: number) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...profile } = user;
    return profile;
  }

  async listOthers(id: number) {
    return this.repo.find({ where: { id: Not(id) } });
  }

  async update(id: number, dto: Partial<User>) {
    await this.repo.update(id, dto);
    return this.findById(id);
  }

  async suggest(id: number) {
    const all = await this.listOthers(id);
    return all.sort(() => 0.5 - Math.random()).slice(0, 5);
  }
}