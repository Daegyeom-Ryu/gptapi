import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { ChatGptResponse } from './dto/response-chatgpt.dto';

import { STT, STTSchema } from 'src/forms/schema.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatGptService {
  private readonly apiKey: string;
  // stt model 주입
  // constructor(apiKey: string, @InjectModel(STT.name) private sttModel: Model<STT>){
  //   this.apiKey = apiKey;
  // }
  constructor(apiKey:string){
    this.apiKey=apiKey;
  }
  // DB에서 prompt에 넣을 데이터 찾아오기 

  async generateTextGPT3({ prompt }: CreateChatgptDto) {
    return this.generateText({ prompt, model:'text-davinci-003' })
  };
  async generateText({ prompt, model }: CreateChatgptDto) {
    try {
      const response = await axios.post<ChatGptResponse>(
        'https://api.openai.com/v1/completions',
        {
          model,
          prompt,
          temperature: 1,
          max_tokens: 4000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${this.apiKey}`,
          },
        },
      );
       
      return response.data['choices'][0]['text'];
    } catch (error: any) {
      throw new HttpException('Falha ao gerar texto', error.response.status);
    }
  }
}