import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'
import { NbButtonModule, NbInputModule, NbSpinnerModule } from '@nebular/theme'
import { ThemeModule } from '@theme/theme.module'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    ThemeModule,
  ],
  exports: [LoginComponent, SignupComponent],
})
export class AuthModule {}
