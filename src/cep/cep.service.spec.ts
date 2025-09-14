import { Test, TestingModule } from '@nestjs/testing';
import { CepService } from './cep.service';
import { NotFoundException } from '@nestjs/common';

const mockCepProvider = {
  findAddressByCep: jest.fn(),
};

describe('CepService', () => {
  let service: CepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CepService,
        {
          provide: 'CepProvider',
          useValue: mockCepProvider,
        },
      ],
    }).compile();

    service = module.get<CepService>(CepService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAddressByCep', () => {
    it('should return a formatted address when a valid CEP is provided', async () => {
      const cep = '01001000';
      const expectedAddress = {
        cep: '01001-000',
        street: 'Praça da Sé',
        neighborhood: 'Sé',
        city: 'São Paulo',
        state: 'SP',
      };

      mockCepProvider.findAddressByCep.mockResolvedValue(expectedAddress);

      const result = await service.findAddressByCep(cep);
      expect(mockCepProvider.findAddressByCep).toHaveBeenCalledTimes(1);
      expect(mockCepProvider.findAddressByCep).toHaveBeenCalledWith(cep);
      expect(result).toEqual(expectedAddress);
    });

    it('should throw a NotFoundException when the CEP is not found by the provider', async () => {
      const cep = '99999999';
      mockCepProvider.findAddressByCep.mockRejectedValue(
        new NotFoundException('CEP não encontrado.'),
      );
      await expect(service.findAddressByCep(cep)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw a NotFoundException when the provider throws an error', async () => {
      const cep = '00000000';
      mockCepProvider.findAddressByCep.mockRejectedValue(
        new NotFoundException('Não foi possível buscar o CEP'),
      );
      await expect(service.findAddressByCep(cep)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
