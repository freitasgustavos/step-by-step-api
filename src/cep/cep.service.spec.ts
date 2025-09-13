import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from './cep.service';
import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { of, throwError } from 'rxjs';

const mockHttpService = {
  get: jest.fn(),
};

describe('CepService', () => {
  let service: CepService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CepService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<CepService>(CepService);
    httpService = module.get<HttpService>(HttpService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAddressByCep', () => {
    it('should return a formatted address when a valid CEP is provided', async () => {
      const cep = '01001000';
      const mockViaCepResponse = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      };
      const expectedAddress = {
        cep: '01001-000',
        street: 'Praça da Sé',
        neighborhood: 'Sé',
        city: 'São Paulo',
        state: 'SP',
      };

      mockHttpService.get.mockReturnValue(of({ data: mockViaCepResponse }));

      const result = await service.findAddressByCep(cep);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(httpService.get).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(httpService.get).toHaveBeenCalledWith(
        `https://viacep.com.br/ws/${cep}/json/`,
      );
      expect(result).toEqual(expectedAddress);
    });

    it('should throw a NotFoundException when the CEP is not found by the external API', async () => {
      const cep = '99999999';
      const mockErrorResponse = {
        erro: true,
      };

      mockHttpService.get.mockReturnValue(of({ data: mockErrorResponse }));

      await expect(service.findAddressByCep(cep)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw a NotFoundException when the external API call fails', async () => {
      const cep = '00000000';

      mockHttpService.get.mockReturnValue(
        throwError(() => new Error('Network error')),
      );

      await expect(service.findAddressByCep(cep)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
