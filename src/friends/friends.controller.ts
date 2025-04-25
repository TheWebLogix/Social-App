import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendRequestDto } from './dto/friend-request.dto';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guards';

@Controller('/friends')
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private svc: FriendsService) {}

  @Post('request')
  send(@Req() req, @Body() dto: FriendRequestDto) {
    return this.svc.sendRequest(req.user.userId, dto.userId);
  }

  @Patch('request/:id/accept')
  accept(@Req() req, @Param('id') id: number) {
    return this.svc.respond(id, req.user.userId, true);
  }

  @Patch('request/:id/reject')
  reject(@Req() req, @Param('id') id: number) {
    return this.svc.respond(id, req.user.userId, false);
  }

  @Get('list')
  list(@Req() req) {
    return this.svc.listFriends(req.user.userId);
  }

  @Get('requests')
  requests(@Req() req) {
    return this.svc.listRequests(req.user.userId);
  }
}