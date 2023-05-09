import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@auth/auth.guard'
import { environment } from '@environments/environment'
import { NbAuthComponent } from '@nebular/auth'

import { LoginComponent } from './auth/login/login.component'
import { SignupComponent } from './auth/signup/signup.component'

export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  { path: '**', redirectTo: '' },
]

const config: ExtraOptions = {
  useHash: environment.production,
  enableTracing: !environment.production,
}

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
