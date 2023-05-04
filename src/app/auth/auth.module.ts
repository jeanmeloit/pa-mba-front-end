import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'
import { NbSpinnerModule } from '@nebular/theme'
import { ThemeModule } from '@theme/theme.module'

import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonsModule, NbSpinnerModule, ThemeModule],
  exports: [LoginComponent],
})
export class AuthModule {}
