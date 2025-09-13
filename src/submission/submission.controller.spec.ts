import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { SaveStepDto } from './dto/save-step.dto';

const mockSubmissionService = {
  saveStep: jest.fn(),
  complete: jest.fn(),
};

describe('SubmissionController', () => {
  let controller: SubmissionController;
  let service: SubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionController],
      providers: [
        {
          provide: SubmissionService,
          useValue: mockSubmissionService,
        },
      ],
    }).compile();

    controller = module.get<SubmissionController>(SubmissionController);
    service = module.get<SubmissionService>(SubmissionService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('saveStep', () => {
    it('should call submissionService.saveStep with the correct data', async () => {
      const dto: SaveStepDto = {
        step: 1,
        data: { name: 'test', email: 'test@example.com' },
      };
      const expectedResult = { id: 'some-uuid', ...dto };

      mockSubmissionService.saveStep.mockResolvedValue(expectedResult);

      const result = await controller.saveStep(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.saveStep).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.saveStep).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('completeSubmission', () => {
    it('should call submissionService.complete with the correct id', async () => {
      const submissionId = 'test-uuid';
      const expectedResult = { id: submissionId, status: 'COMPLETED' };

      mockSubmissionService.complete.mockResolvedValue(expectedResult);

      const result = await controller.completeSubmission(submissionId);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.complete).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.complete).toHaveBeenCalledWith(submissionId);
      expect(result).toEqual(expectedResult);
    });
  });
});
