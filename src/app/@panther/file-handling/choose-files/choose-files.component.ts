import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FileInterface } from '@interfaces/file.interface'
import { NbDialogRef } from '@nebular/theme'
import { ToastrService } from '@services/toastr/toastr.service'
import { Observable, ReplaySubject } from 'rxjs'

import { FileParser } from '../misc/file-parser'
import { FileHandlingService } from './../file-handling.service'

@Component({
  selector: 'pds-choose-files',
  templateUrl: './choose-files.component.html',
  styleUrls: ['./choose-files.component.scss'],
})
export class ChooseFilesComponent implements OnInit {
  public loading: boolean = false
  public files: Set<File> = new Set()
  public progress: any
  public responseFile: FileInterface
  public uploadSuccessful: boolean = false
  public uploading: boolean = false
  public uploadProgress: number = 0
  public descricao: string
  public fileModel: FileInterface = {
    nome: '',
    descricao: '',
    link: '',
    tipo: 'NONE',
    tamanho: '',
    icone: '',
  }

  @ViewChild('file', { static: false }) public file: any

  @Input() public url: string

  @Input() public description: boolean

  @Input() public maxSize: string = '1' // 1mb === 1000000 bytes

  @Input() public titulo: string

  @Input() public dialogTitle: string = 'Gerenciador de arquivos'

  @Input() public confirmText: string = 'Confirmar'

  @Input() public confirmIcon: string = 'fas fa-check-circle'

  @Input() public backText: string = 'Voltar'

  @Input() public backIcon: string = 'fas fa-undo-alt'

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private fileHandlingService: FileHandlingService,
    private toastr: ToastrService,
    private fileParser: FileParser,
  ) {}

  public ngOnInit(): void {}

  public uploadFile($event: any): void {
    const files: { [key: string]: File } = this.file.nativeElement.files

    if (files.length) {
      for (const key in files) {
        if (!isNaN(parseInt(key, 10))) {
          if (files[key].size > parseInt(this.maxSize, 10) * 1000000) {
            this.toastr.send({
              type: 'danger',
              // tslint:disable-next-line: max-line-length
              message:
                'O tamanho do arquivo excede o máximo permitido de ' +
                this.maxSize +
                'MB',
            })

            return
          }

          if (
            files[key].type === 'application/sql' ||
            files[key].name.indexOf('.sql') > -1
          ) {
            this.toastr.send({
              type: 'danger',
              message: 'Formato de arquivo não permitido',
            })

            return
          }
          if (
            files[key].type === 'application/x-msdownload' ||
            files[key].name.indexOf('.exe') > -1
          ) {
            this.toastr.send({
              type: 'danger',
              message: 'Formato de arquivo não permitido',
            })

            return
          }
          this.files.add(files[key])
        }
      }

      this.fileModel.tipo = this.fileParser.getFileType($event.target.files[0])
      this.fileModel.nome = $event.target.files[0].name

      // set the component state to "uploading"
      this.uploading = true

      let me = this
      const reader = new FileReader()

      reader.readAsDataURL(files[0])
      reader.onload = function () {
        const file = {
          arquivo: reader.result.toString(),
          nome: files[0].name,
          tamanho: (files[0].size / 1000000).toString(),
          tipo_arquivo: files[0].type,
          tipo: me.fileParser.getFileType(files[0]),
          publicaInternet: 'YES',
        }

        if (file) {
          me.responseFile = file
        }
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }

      const endWidth = 100
      const progressInterval = setInterval(() => {
        if (this.uploadProgress === endWidth) {
          clearInterval(progressInterval)
        } else {
          this.uploadProgress += 10
        }
      }, 90)
      this.uploadSuccessful = true
      this.uploading = false
    }
  }

  public getBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1)

    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = event => result.next(btoa(event.target.result.toString()))
    return result
  }

  public isDisabled(): boolean {
    if (this.description) {
      if (!this.descricao) {
        return true
      }
    }
    return this.fileModel.nome === '' || this.uploading
  }

  public dispose(): void {
    this.dialogRef.close(false)
  }

  public confirm(): void {
    if (this.descricao && this.responseFile) {
      this.responseFile.descricao = this.descricao
    }
    this.dialogRef.close(this.responseFile)
  }
}
