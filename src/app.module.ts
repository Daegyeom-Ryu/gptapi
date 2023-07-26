import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema, STT, STTSchema, User, UserSchema } from 'src/forms/schema.schema';

import { ConfigModule } from '@nestjs/config';
import { ChatGptService } from './chatgpt.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    // 나중에 서버에 올릴 때, env 파일에 전부 담아두면, API 정지되거나 하는 문제 없어질듯
    MongooseModule.forRoot("mongodb+srv://aaaaaaaaaaaaa:aaaaaaaaaaaaaaa@cluster0.n61crm6.mongodb.net/sttDB?retryWrites=true&w=majority"),
    MongooseModule.forFeature([{name: STT.name, schema: STTSchema}]),

  ],
  controllers: [AppController],
  providers: [AppService, ChatGptService],
})
export class AppModule {}
