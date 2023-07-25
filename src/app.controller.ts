import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  findFromDB() {
    return this.appService.findFromDB();
  }
  // generateText() {
  //   // return this.appService.showMessage();
  //   return this.appService.generateText('안녕 GPT야 만나서 반가워');
  // }

  // getHello(): string {
  //   return this.appService.getHello();
}


