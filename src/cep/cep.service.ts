import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ViaCepResponseDto } from './dto/via-cep-response.dto';

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}

  async findAddressByCep(cep: string) {
    const cleanedCep = cep.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cleanedCep}/json/`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ViaCepResponseDto>(url),
      );

      if (data.erro) {
        throw new NotFoundException('CEP não encontrado.');
      }

      return {
        cep: data.cep,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      };
    } catch {
      throw new NotFoundException(`Não foi possível buscar o CEP: ${cep}`);
    }
  }
}
