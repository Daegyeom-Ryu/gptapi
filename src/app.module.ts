import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptModule } from './chatgpt.module'

import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema, STT, STTSchema, User, UserSchema } from 'src/forms/schema.schema';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://ydg:1234@cluster0.n61crm6.mongodb.net/sttDB?retryWrites=true&w=majority"),
    MongooseModule.forFeature([{name: STT.name, schema: STTSchema}]),
    ChatGptModule.forRoot('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'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
