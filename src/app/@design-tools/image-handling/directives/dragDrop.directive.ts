import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

export interface FileHandle {
  file: File
  url: SafeUrl
}

@Directive({
  selector: '[eqpDragDrop]',
})
export class DragDropDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter()

  @HostBinding('style.background') private background = 'none'
  @HostBinding('style.border') private border = '#808080 1px solid'

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event']) public onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.background = '#808080'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.background = 'none'
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.background = 'none'

    let files: FileHandle[] = []
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      const file = event.dataTransfer.files[i]
      const url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file),
      )
      files.push({ file, url })
    }
    if (files.length > 0) {
      this.files.emit(files)
    }
  }
}
