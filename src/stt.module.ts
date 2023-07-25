import { Module } from '@nestjs/common';

// 동윤
import { MongooseModule } from '@nestjs/mongoose';
import { STT, STTSchema } from 'src/forms/schema.schema';
// 나
@Module({
  imports: [
    // 동윤
    MongooseModule.forFeature([{name: STT.name, schema: STTSchema}]),
    MongooseModule.forRoot("mongodb+srv://ydg:1234@cluster0.n61crm6.mongodb.net/sttDB?retryWrites=true&w=majority"),
    ],
//   providers: [SttGateway, SttService],
})
export class SttModule {}
