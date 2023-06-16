import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, Welcome to Chuck Noris Joke App!';
  }
}
