import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { SignupService } from '../services/signup.service'

@Component({
  selector: 'pds-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public form: FormGroup = this.getForm()
  public loading = false
  public submited = false
  // prettier-ignore
  public phoneMask: any[] = [
    '(', /\d/, /\d/, ')', ' ', /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,
  ]

  private subscription: Subscription

  constructor(
    private service: SignupService,
    private toastr: ToastrService,
    private router: Router,
    private sanitizer: Sanitizer,
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  private getForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      age: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return
    }

    this.form.value.phone = this.form.value.phone.replace(/\D/g, '')

    this.subscription = this.service
      .signup(this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.toastr.send({
            type: 'info',
            message:
              'Você será redirecionado para a tela de login dentro dos próximos segundos',
            customDuration: 5000,
          })
          this.toastr.send({
            type: 'success',
            message: 'Seu usuário foi criado com sucesso.',
            customDuration: 5000,
          })

          setTimeout(() => {
            this.router.navigate(['/auth/login'])
          }, 3000)
        },
        (err: any) => {
          this.toastr.send({
            type: 'danger',
            message: err.error?.causa?.descricao || err?.error?.causa?.message,
          })
        },
      )
  }
}
