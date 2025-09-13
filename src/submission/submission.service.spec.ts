import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionService } from './submission.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { SubmissionStatus } from '@prisma/client';

const mockPrismaService = {
  submission: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('SubmissionService', () => {
  let service: SubmissionService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SubmissionService>(SubmissionService);
    prisma = module.get(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveStep', () => {
    it('should create a new submission if no submissionId is provided', async () => {
      const dto = {
        step: 1,
        data: { name: 'Test User', email: 'test@example.com' },
      };
      const mockSubmission = {
        id: 'new-uuid',
        status: SubmissionStatus.IN_PROGRESS,
        current_step: dto.step,
        form_data: dto.data,
        started_at: new Date(),
        last_updated_at: new Date(),
        completed_at: null,
      };

      prisma.submission.create.mockResolvedValue(mockSubmission);

      const result = await service.saveStep(dto as any);

      expect(prisma.submission.create).toHaveBeenCalledTimes(1);
      expect(prisma.submission.create).toHaveBeenCalledWith({
        data: {
          current_step: dto.step,
          form_data: dto.data,
          status: SubmissionStatus.IN_PROGRESS,
        },
      });
      expect(result).toEqual(mockSubmission);
      expect(prisma.submission.update).not.toHaveBeenCalled();
    });

    it('should update an existing submission if a submissionId is provided', async () => {
      const submissionId = 'existing-uuid';
      const dto = { submissionId, step: 2, data: { document: '123' } };
      const existingSubmission = {
        id: submissionId,
        form_data: { name: 'Test User' },
        current_step: 1,
      };
      const updatedSubmission = {
        ...existingSubmission,
        current_step: dto.step,
        form_data: { ...existingSubmission.form_data, ...dto.data },
      };

      prisma.submission.findUnique.mockResolvedValue(existingSubmission);
      prisma.submission.update.mockResolvedValue(updatedSubmission);

      const result = await service.saveStep(dto as any);

      expect(prisma.submission.findUnique).toHaveBeenCalledWith({
        where: { id: submissionId },
      });
      expect(prisma.submission.update).toHaveBeenCalledTimes(1);
      expect(prisma.submission.update).toHaveBeenCalledWith({
        where: { id: submissionId },
        data: {
          current_step: dto.step,
          form_data: updatedSubmission.form_data,
        },
      });
      expect(result).toEqual(updatedSubmission);
      expect(prisma.submission.create).not.toHaveBeenCalled();
    });

    it('should throw a NotFoundException if trying to update a non-existent submission', async () => {
      const submissionId = 'non-existent-uuid';
      const dto = { submissionId, step: 2, data: { document: '123' } };

      prisma.submission.findUnique.mockResolvedValue(null);

      await expect(service.saveStep(dto as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
