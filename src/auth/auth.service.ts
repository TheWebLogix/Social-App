
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(name: string, email: string, pass: string) {
    const hashed = await bcrypt.hash(pass, 10);
    return this.usersService.create({ name, email, password: hashed });
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) return user;
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}