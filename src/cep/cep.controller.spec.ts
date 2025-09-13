import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';

const mockCepService = {
  findAddressByCep: jest.fn(),
};

describe('CepController', () => {
  let controller: CepController;
  let service: CepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepController],
      providers: [
        {
          provide: CepService,
          useValue: mockCepService,
        },
      ],
    }).compile();

    controller = module.get<CepController>(CepController);
    service = module.get<CepService>(CepService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAddressByCep', () => {
    it('should call cepService.findAddressByCep with the correct cep parameter', async () => {
      const cep = '01001000';
      const expectedAddress = {
        cep: '01001-000',
        street: 'Praça da Sé',
        neighborhood: 'Sé',
        city: 'São Paulo',
        state: 'SP',
      };

      mockCepService.findAddressByCep.mockResolvedValue(expectedAddress);

      const result = await controller.findAddressByCep(cep);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAddressByCep).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAddressByCep).toHaveBeenCalledWith(cep);
      expect(result).toEqual(expectedAddress);
    });
  });
});
