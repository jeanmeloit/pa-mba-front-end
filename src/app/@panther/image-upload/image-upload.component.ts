import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { ToastrService } from '@services/toastr/toastr.service'
import { Subscription } from 'rxjs'

import { ImageUploadService } from './services/image-upload.service'

class FileSnippet {
  static readonly IMAGE_SIZE = { width: 950, height: 720 }

  pending: boolean = false
  status: string = 'INIT'

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'pds-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, OnDestroy {
  public selectedFile: FileSnippet
  private subscription: Subscription
  public imageChangedEvent: any

  @Output() private imageUploaded = new EventEmitter()
  @Output() private imageError = new EventEmitter()
  @Output() private imageLoadedToContainer = new EventEmitter()
  @Output() private croppingCanceled = new EventEmitter()

  constructor(
    private imageUploadService: ImageUploadService,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  public imageCropped(file: File): FileSnippet | File {
    if (this.selectedFile) {
      return (this.selectedFile.file = file)
    }

    return (this.selectedFile = new FileSnippet('', file))
  }

  public imageLoaded() {
    this.imageLoadedToContainer.emit()
  }

  public cancelCropping() {
    this.imageChangedEvent = null
    this.croppingCanceled.emit()
  }

  public processFile(event: any) {
    this.selectedFile = event.target.files[0]

    const URL = window.URL
    let file, img

    if (
      (file = event.target.files[0]) &&
      (file.type === 'image/png' || file.type === 'image/jpeg')
    ) {
      img = new Image()

      const self = this
      img.onload = function () {
        if (
          this.width > FileSnippet.IMAGE_SIZE.width &&
          this.height > FileSnippet.IMAGE_SIZE.height
        ) {
          self.imageChangedEvent = event
        } else {
          self.toastr.send({
            type: 'danger',
            message: `Minimum width is ${FileSnippet.IMAGE_SIZE.width} and minimum heigth is ${FileSnippet.IMAGE_SIZE.height}`,
          })
        }
      }

      img.src = URL.createObjectURL(file)
    } else {
      this.toastr.send({
        type: 'danger',
        message: 'Unsupported File Type. Only jpeg and png is allowed!',
      })
    }
  }

  public uploadImage() {
    if (this.selectedFile) {
      const reader = new FileReader()

      reader.addEventListener('load', (event: any) => {
        this.selectedFile.src = event.target.result

        this.selectedFile.pending = true
        //   this.imageUploadService.uploadImage(this.selectedFile.file).subscribe(
        //     (imageUrl: string) => {
        //       this.onSuccess(imageUrl)
        //     },
        //     (errorResponse: HttpErrorResponse) => {
        //       this.toastr.send({
        //         type: 'danger',
        //         message: errorResponse.error.errors[0].detail,
        //       })
        //       this.onFailure()
        //     },
        //   )
      })
      // this.onSuccess(imageUrl)
      reader.readAsDataURL(this.selectedFile.file)
    }
  }

  private onSuccess(imageUrl: string) {
    this.selectedFile.pending = false
    this.selectedFile.status = 'Sucesso'
    this.selectedFile.pending = false
    this.imageChangedEvent = null
    this.imageUploaded.emit(imageUrl)
  }

  private onFailure() {
    this.selectedFile.pending = false
    this.selectedFile.status = 'Erro'
    this.imageChangedEvent = null
    this.imageError.emit('')
  }
}
