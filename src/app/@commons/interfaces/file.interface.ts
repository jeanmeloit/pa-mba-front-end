export interface FileInterface {
  uuid?: string
  arquivo?: string
  nome?: string
  descricao?: string
  link?: string
  tipo_arquivo?: string
  identificadorUuid?: string
  host?: string
  publicaInternet?: string
  etag?: string
  conteudo?: string
  requisicaoId?: string
  tipo?:
    | string
    | 'DOC'
    | 'GIF'
    | 'HTML'
    | 'JPG'
    | 'MP3'
    | 'MPG'
    | 'NONE'
    | 'PDF'
    | 'PNG'
    | 'PPT'
    | 'TEXT'
    | 'XLS'
    | 'XML'
    | 'ZIP'
  icone?: string
  tamanho?: string
}
