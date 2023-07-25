import { Injectable } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service'
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { STT, STTSchema } from './forms/schema.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    private readonly chatGptService: ChatGptService,
    @InjectModel(STT.name) private sttModel:Model<STT>) {}

  async findFromDB(){
    // const result = await this.sttModel.find({}, {stt_message: 1, _id:0}).exec();
    // const result = await this.sttModel.find({}, { stt_message: 1, _id: 0 });
    const result = await this.sttModel.find({}, 'stt_message');
    // result.
    for (let elem of result){
      
    } 
    console.log(result);
    return result;
  }  

  async generateText(prompt: string): Promise<any> {
    const createChatgptDto: CreateChatgptDto = { prompt };
    return this.chatGptService.generateTextGPT3(createChatgptDto) as any;
  }
}
