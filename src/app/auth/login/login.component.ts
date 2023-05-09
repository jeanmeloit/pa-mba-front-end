import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import { NbThemeService } from '@nebular/theme'
import { finalize, first } from 'rxjs/operators'

import { LoginService } from './../services/login.service'

@Component({
  selector: 'pds-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.getForm()
  public loading = false
  public returnUrl: string
  public error = ''

  public currentTheme: string

  constructor(
    private service: LoginService,
    private themeService: NbThemeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    let theme = localStorage.getItem('theme')
    if (!theme) theme = 'default'

    this.themeService.changeTheme(theme)
    this.currentTheme = localStorage.getItem('theme')
    this.manageUrls()

    const mensagem = JSON.parse(localStorage.getItem('error'))
    localStorage.removeItem('error')
    if (mensagem) {
      setTimeout(() => {
        this.toastr.bulkSend(mensagem)
      }, 0)
    }
  }

  private getForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  private manageUrls(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl']

    if (returnUrl && returnUrl.indexOf('/auth/login') === -1) {
      this.returnUrl = returnUrl
    } else {
      this.returnUrl = '/'
    }
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return
    }

    const payload = {
      email: this.f.email.value,
      password: this.f.password.value,
    }

    this.loading = true
    this.service
      .login(payload)
      .pipe(
        first(),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl])
        },
      })
  }

  public signup(): void {
    this.router.navigate(['/auth/signup'])
  }
}
