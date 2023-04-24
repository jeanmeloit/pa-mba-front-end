import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import { NbDialogRef } from '@nebular/theme'
import { FileHandle } from '@panther/image-handling/directives/dragDrop.directive'
import Cropper from 'cropperjs'

@Component({
  selector: 'pds-img-adjuster',
  templateUrl: './img-adjuster.component.html',
  styleUrls: ['./img-adjuster.component.scss'],
})
export class ImgAdjusterComponent implements OnInit, AfterViewInit {
  public loading: boolean = false
  private cropper: Cropper

  @ViewChild('image', { static: false }) public image: ElementRef

  @Input() public adjusterSize: 'small' | 'medium' | 'large' | 'extra-large' =
    'small'

  @Input() public dialogTitle: string = 'Confirmação'

  @Input() public confirmText: string = 'Confirmar'

  @Input() public confirmIcon: string = 'fas fa-check-circle'

  @Input() public backText: string = 'Voltar'

  @Input() public backIcon: string = 'fas fa-undo-alt'

  @Input() public originalImage: FileHandle

  @Input() public adjustedImage: string

  @Input() public isSignature: boolean = false

  constructor(protected dialogRef: NbDialogRef<any>) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.cropper = new Cropper(this.image.nativeElement, {
      aspectRatio: this.isSignature ? 0 : 1,
      modal: true,
      highlight: false,
      background: true,
      crop: event => {
        const canvas = this.cropper.getCroppedCanvas()
        this.adjustedImage = canvas.toDataURL('image/png')
      },
    })
  }

  public dispose(): void {
    this.dialogRef.close(false)
  }

  public confirm(): void {
    this.dialogRef.close(this.adjustedImage)
  }
}
