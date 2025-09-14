export interface CepProvider {
  findAddressByCep(cep: string): Promise<{
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }>;
}
