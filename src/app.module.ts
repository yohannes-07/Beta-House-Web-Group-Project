import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserModule
} from './users/user.module';
import {
  AuthModule
} from './auth/auth.module';
import { HousesModule } from './houses/houses.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/auth'),
  UserModule,
  AuthModule,
  HousesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
