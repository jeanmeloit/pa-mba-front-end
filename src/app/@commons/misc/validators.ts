import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { ToastrService } from './../services/toastr/toastr.service'

@Injectable({
  providedIn: 'root',
})
export class FormValidator {
  constructor(private toastr: ToastrService) {}

  public markFieldsAsDirty(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.markFieldsAsDirty(control)
      }
    })

    this.toastr.send({
      type: 'danger',
      message: 'Preencha os campos destacados',
    })
  }

  public markFieldsAsPristine(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsPristine({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.markFieldsAsPristine(control)
      }
    })
  }
}
