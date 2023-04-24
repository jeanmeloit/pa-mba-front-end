import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { NbDialogService } from '@nebular/theme'
import { FileHandle } from '@panther/image-handling/directives/dragDrop.directive'

import { ImgAdjusterComponent } from './../img-adjuster/img-adjuster.component'

@Component({
  selector: 'pds-img-container',
  templateUrl: './img-container.component.html',
  styleUrls: ['./img-container.component.scss'],
})
export class ImgContainerComponent implements OnInit {
  @Input() public imageShape: 'default' | 'rounded' | 'signature' = 'default'

  @Input() public imgWidth: string = '160px'
  @Input() public imgHeight: string = '20vh'
  @Input() public legacyImage: string

  @Input() public adjusterSize: 'small' | 'medium' | 'large' | 'extra-large' =
    'small'

  // EMITTER

  @Output()
  private onImgCrop: EventEmitter<any> = new EventEmitter()

  public files: FileHandle[] = []
  public croppedImage: string

  constructor(
    private dialogService: NbDialogService,
    private sanitizer: DomSanitizer,
  ) {}

  public ngOnInit(): void {}

  public filesDropped(files: FileHandle[]): void {
    this.setFilesUp(files)
  }

  public onFileChanged(file: File): void {
    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file),
    )

    let files: FileHandle[] = [
      {
        file,
        url,
      },
    ]

    this.setFilesUp(files)
  }

  public setFilesUp(files: FileHandle[]): void {
    this.files = files
    this.openAdjuster()
  }

  public removeImage(): void {
    this.croppedImage = null
    this.legacyImage = null
  }

  public openAdjuster(): void {
    const dialogRef = this.dialogService.open(ImgAdjusterComponent, {})

    dialogRef.componentRef.instance.originalImage = this.files[0]
    dialogRef.componentRef.instance.adjusterSize = this.adjusterSize
    if (this.imageShape === 'signature')
      dialogRef.componentRef.instance.isSignature = true

    dialogRef.onClose.subscribe(data => {
      if (data) {
        this.croppedImage = data
        this.onImgCrop.emit(this.croppedImage)
      } else null
    })
  }
}
