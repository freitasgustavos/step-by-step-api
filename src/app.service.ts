import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      name: 'setp-by-step-api',
      version: '0.0.1',
      routes: ['/cep/:cep', '/submission'],
      timestamp: new Date().toISOString(),
      message: 'Bem-vindo à Step-by-Step API!',
    };
  }
}
