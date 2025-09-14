import { Injectable } from '@nestjs/common';
import type { CepProvider } from './cep.provider';
import { Inject } from '@nestjs/common';

@Injectable()
export class CepService {
  constructor(
    @Inject('CepProvider') private readonly cepProvider: CepProvider,
  ) {}

  async findAddressByCep(cep: string) {
    return this.cepProvider.findAddressByCep(cep);
  }
}
