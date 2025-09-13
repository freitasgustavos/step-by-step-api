import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveStepDto } from './dto/save-step.dto';
import { Submission, SubmissionStatus, Prisma } from '@prisma/client';

@Injectable()
export class SubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  async saveStep(dto: SaveStepDto): Promise<Submission> {
    const { submissionId, step, data } = dto;

    if (submissionId) {
      const existingSubmission = await this.prisma.submission.findUnique({
        where: { id: submissionId },
      });

      if (!existingSubmission) {
        throw new NotFoundException(
          `Submissão com ID ${submissionId} não encontrada.`,
        );
      }

      const updatedFormData = {
        ...(existingSubmission.form_data as object),
        ...data,
      };

      return this.prisma.submission.update({
        where: { id: submissionId },
        data: {
          current_step: step,
          form_data: updatedFormData as unknown as Prisma.JsonObject,
        },
      });
    } else {
      return this.prisma.submission.create({
        data: {
          current_step: step,
          form_data: data as unknown as Prisma.JsonObject,
          status: SubmissionStatus.IN_PROGRESS,
        },
      });
    }
  }

  async complete(submissionId: string): Promise<Submission> {
    await this.prisma.submission.findUniqueOrThrow({
      where: { id: submissionId },
    });

    return this.prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: SubmissionStatus.COMPLETED,
        completed_at: new Date(),
      },
    });
  }
}
