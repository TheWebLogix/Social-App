import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guards';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  listOthers(@Req() req) {
    return this.usersService.listOthers(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('suggestions')
  suggestions(@Req() req) {
    return this.usersService.suggest(req.user.userId);
  }
}