import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';
import { HttpModule } from '@nestjs/axios';
import { ViaCepProvider } from './providers/via-cep.provider';

@Module({
  imports: [HttpModule],
  controllers: [CepController],
  providers: [
    CepService,
    ViaCepProvider,
    {
      provide: 'CepProvider',
      useExisting: ViaCepProvider,
    },
  ],
})
export class CepModule {}
