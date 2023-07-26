import { HttpException, Injectable } from '@nestjs/common';
import {Configuration, OpenAIApi} from 'openai';
import {ConfigService} from '@nestjs/config';
  
@Injectable()
export class ChatGptService {
  openai: OpenAIApi;
  constructor(private readonly configService: ConfigService)
  {
    const configuration = new Configuration({
      organization: this.configService.get<string>('OPENAI_ORGANIZATION'),
      apiKey: this.configService.get<string>('CHATGPT_OPEN_API_KEY')
    })
    this.openai = new OpenAIApi(configuration);  
  }
  async generateTextGPT3(prompt: string){
    

    try{
      console.log('test test')
      const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {role:'user', content: prompt}
      ],
      max_tokens:10000,
      temperature:1
    })
      return response.data.choices[0].message.content
    } catch(error) {
      console.log(error)
      throw new HttpException('Error making API request', error.response.status);
    }
  } 
}