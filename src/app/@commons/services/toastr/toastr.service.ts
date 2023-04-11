import { Injectable } from '@angular/core'
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from '@nebular/theme'

import { ToastrMessageInterface } from './interfaces/toastr-message'

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  public position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT

  constructor(private nbToastr: NbToastrService) {}

  public send(dto: ToastrMessageInterface): void {
    const toastrPrefs = this.getStandardToastConfig()

    if (dto.success) {
      toastrPrefs.status = 'success'
      if (!dto.title) dto.title = 'Sucesso'
    } else if (dto.info) {
      toastrPrefs.status = 'info'
      if (!dto.title) dto.title = 'Informação'
    } else if (dto.warning) {
      toastrPrefs.status = 'warning'
      if (!dto.title) dto.title = 'Atenção'
    } else if (dto.error) {
      toastrPrefs.duration = 0
      toastrPrefs.status = 'danger'
      if (!dto.title) dto.title = 'Erro'
    } else toastrPrefs.status = 'primary'

    this.nbToastr.show(dto.message, dto.title, toastrPrefs)
  }

  public bulkSend(messages: any): void {
    const toastrPrefs = this.getStandardToastConfig()
    for (const iterator of messages) {
      let title
      if (iterator.success) {
        toastrPrefs.status = 'success'
        title = 'Sucesso'
      } else if (iterator.info) {
        toastrPrefs.duration = 0
        toastrPrefs.status = 'info'
        title = 'Informação'
      } else if (iterator.warning) {
        toastrPrefs.status = 'warning'
        title = 'Atenção'
      } else if (iterator.error) {
        toastrPrefs.duration = 0
        toastrPrefs.status = 'danger'
        title = 'Erro'
      } else toastrPrefs.status = 'primary'

      this.nbToastr.show(iterator.message, title, toastrPrefs)
    }
  }

  public getStandardToastConfig(): Partial<NbToastrConfig> {
    const config = {
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: this.position,
      preventDuplicates: true,
    }
    return config
  }
}
