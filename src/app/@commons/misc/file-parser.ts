import { FileInterface } from '@interfaces/file.interface'

export class FileParser {
  constructor() {}

  public getFileType(file: File): FileInterface['tipo'] {
    if (file.type && file.type !== '') {
      switch (file.type) {
        case 'application/x-zip-compressed':
          return 'ZIP'
        case 'application/pdf':
          return 'PDF'
        case 'image/jpeg':
          return 'JPG'
        case 'text/plain':
          return 'TEXT'
        case 'video/mpeg':
          return 'MPG'
        case 'audio/mp3':
          return 'MP3'
        case 'image/gif':
          return 'GIF'
        case 'image/png':
          return 'PNG'
        case 'text/html':
          return 'HTML'
        case 'text/xml':
          return 'XML'
        default:
          return 'NONE'
      }
    } else {
      const name = file.name ? file.name : file['nome']

      return this.getFileTypeByFileExtension(name)
    }
  }

  public getFileTypeByFileExtension(name: string): FileInterface['tipo'] {
    const fileArr = name.split('.')

    // FIXME: It's being called on completion of the upload observables,
    // and for some reason it has data different from how it should be called
    switch (fileArr[fileArr.length - 1].toUpperCase()) {
      case 'DOC':
      case 'DOCX':
        return 'DOC'
      case 'PPT':
      case 'PPTX':
        return 'PPT'
      case 'XLS':
      case 'XLSX':
        return 'XLS'
      case 'PDF':
        return 'PDF'
      case 'JPG':
      case 'JPEG':
        return 'JPG'
      case 'TXT':
        return 'TEXT'
      case 'GIF':
        return 'GIF'
      case 'PNG':
        return 'PNG'
      case 'XML':
        return 'XML'

      default:
        return 'NONE'
    }
  }
}
