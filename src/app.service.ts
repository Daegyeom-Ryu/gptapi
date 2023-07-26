import { Injectable } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service'
import { STT, STTSchema } from './forms/schema.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    private readonly chatGptService: ChatGptService,
    @InjectModel(STT.name) private sttModel:Model<STT>) {}

  async findFromDB(){
    // prompt는 요약, 퀴즈, 질문 마다 다르게 하면 될듯 
    let prompt="이 다음에 나오는 글을 5줄로 요약해줘 \n";
    // 이거 발표용 DB 스키마 로 수정해야됌
    const result = await this.sttModel.find({}, 'stt_message');
    const extractResult = result.map((data)=>data.stt_message);
    for (let elem of extractResult){
      prompt += elem;
    }
    return prompt;    
  }  
  
  async generateText(prompt: string): Promise<string> {
    return this.chatGptService.generateTextGPT3(prompt);
  }
}
