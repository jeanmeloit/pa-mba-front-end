export interface ViaCepInterface {
  cep?: string
  logradouro?: string
  complemento?: string
  bairro?: string
  localidade?: string
  uf?: string
  ibge?: string
  gia?: string
  ddd?: string
  siafi?: string
}

export interface ViaCepResponseInterface {
  dados: ViaCepInterface
  sucesso: boolean
}
