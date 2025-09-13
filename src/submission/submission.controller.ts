import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Param,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SaveStepDto } from './dto/save-step.dto';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('step')
  saveStep(@Body(new ValidationPipe()) saveStepDto: SaveStepDto) {
    return this.submissionService.saveStep(saveStepDto);
  }

  @Patch(':id/complete')
  completeSubmission(@Param('id') id: string) {
    return this.submissionService.complete(id);
  }
}
