import {
  Component,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core'
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { FileInterface } from '@interfaces/file.interface'
import { NbDialogService } from '@nebular/theme'

import { ChooseFilesComponent } from '../choose-files/choose-files.component'
import { FileParser } from '../misc/file-parser'

const valueProvider = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => FileInputComponent),
  multi: true,
}

enum Paths {
  TEXT = 'assets/img/files/file-txt.png',
  DOC = 'assets/img/files/file-doc.png',
  GIF = 'assets/img/files/file-gif.png',
  HTML = 'assets/img/files/file-html.png',
  JPG = 'assets/img/files/file-jpg.png',
  MP3 = 'assets/img/files/file-mp3.png',
  MPG = 'assets/img/files/file-mpg.png',
  PDF = 'assets/img/files/file-pdf.png',
  PNG = 'assets/img/files/file-png.png',
  PPT = 'assets/img/files/file-ppt.png',
  XLS = 'assets/img/files/file-xls.png',
  XML = 'assets/img/files/file-xml.png',
  ZIP = 'assets/img/files/file-zip.png',
  NONE = 'assets/img/files/file-none.png',
}

@Component({
  selector: 'pds-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [valueProvider],
})
export class FileInputComponent implements ControlValueAccessor, OnInit {
  @Input() public label?: string
  @Input() public readonly?: boolean = false
  @Input() public required?: boolean = false
  @Input() public class?: string
  @Input() public errorMessage?: string = 'Favor preencher o campo'
  @Input() public dialogTitle?: string = 'Gerenciador de arquivos | Anexo'
  @Input() private formControlName: string
  @Input() public value?: FileInterface[]
  @Input() public maxSize: string
  @Input() public hideLabel: boolean = false
  @Input() public description: boolean = false

  @Input()
  public set initialValue(files: FileInterface[]) {
    this.files = files
    this.value = this.files

    this.propagateChange(this.files)
    this.propagateChange(this.value)
  }

  public files: FileInterface[] = []
  public control: AbstractControl
  public path: typeof Paths = Paths

  @Input() private baseUrl: string = ''
  @Input() public inputClick?: any = () => true

  private propagateChange: any = () => {}

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private dialogService: NbDialogService,
    private fileParser: FileParser,
  ) {}

  public ngOnInit(): void {
    if (this.controlContainer && this.controlContainer.control) {
      this.control = this.controlContainer.control.get(this.formControlName)
    }
  }

  public registerOnTouched(fn: () => void): void {}

  public writeValue(value: any): void {
    if (value) {
      this.value = value
    } else {
      this.value = this.files = []
    }
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  public modelChanged(event: any): void {
    this.propagateChange(event)
  }

  public getFileSrc(file: any): string {
    const name = file.name ? file.name : file.nome

    return this.path[this.fileParser.getFileTypeByFileExtension(name)]
  }

  public removeFile(index: number): void {
    this.files.splice(index, 1)

    this.getAbsControl().setValue(this.files)
  }

  public openFileUploadModal(): void {
    const dialogRef = this.dialogService.open(ChooseFilesComponent, {})

    dialogRef.componentRef.instance.dialogTitle = this.dialogTitle
    dialogRef.componentRef.instance.description = this.description
    dialogRef.componentRef.instance.maxSize = this.maxSize

    dialogRef.onClose.subscribe(data => {
      if (data) {
        this.files.push(data)
        this.getAbsControl().setValue(this.files)
      } else null
    })
  }

  private getAbsControl(): any {
    return this.controlContainer.control.get(this.formControlName)
  }
}
