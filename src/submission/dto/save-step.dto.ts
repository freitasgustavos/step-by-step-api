import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';
import {
  Step1PayloadDto,
  Step2PayloadDto,
  Step3PayloadDto,
  Step4PayloadDto,
} from './step-payloads.dto';

type StepData =
  | Step1PayloadDto
  | Step2PayloadDto
  | Step3PayloadDto
  | Step4PayloadDto;

export class SaveStepDto {
  @IsOptional()
  @IsUUID()
  submissionId?: string;

  @IsNotEmpty()
  @IsNumber()
  step: number;

  @IsNotEmpty()
  @IsObject()
  data: StepData;
}
