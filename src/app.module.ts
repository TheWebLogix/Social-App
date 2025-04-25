import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/orm-config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UsersModule, FriendsModule],
})
export class AppModule {}