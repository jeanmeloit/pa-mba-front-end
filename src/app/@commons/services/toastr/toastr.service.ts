import { Injectable } from '@angular/core'
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from '@nebular/theme'

import { ToastrMessageInterface } from './interfaces/toastr-message'

const toastrPropsByType = {
  ['success']: {
    status: 'success',
    title: 'Sucesso',
  },
  ['info']: {
    status: 'info',
    title: 'Informação',
  },
  ['warning']: {
    status: 'warning',
    title: 'Atenção',
  },
  ['danger']: {
    duration: 0,
    status: 'danger',
    title: 'Erro',
  },
  ['default']: {
    title: '',
    status: 'primary',
  },
}

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  public position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT

  constructor(private nbToastr: NbToastrService) {}

  public send(toastr: ToastrMessageInterface): void {
    this.handleToastr(toastr)
  }

  public bulkSend(toastrs: any | ToastrMessageInterface): void {
    for (const toastr of toastrs) {
      this.handleToastr(toastr)
    }
  }

  private handleToastr(toastr: any | ToastrMessageInterface): void {
    const toastrPrefs = {
      ...this.getStandardToastConfig(),
      ...toastrPropsByType[toastr.type],
    }

    if (toastr.customDuration) toastrPrefs.duration = toastr.customDuration

    this.nbToastr.show(
      toastr.message,
      toastr.title || toastrPrefs.title,
      toastrPrefs,
    )
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
