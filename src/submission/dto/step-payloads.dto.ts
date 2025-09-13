import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class Step1PayloadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}

export class Step2PayloadDto {
  @IsString()
  @IsNotEmpty()
  document: string;
}

export class Step3PayloadDto {
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class Step4PayloadDto {
  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;
}
