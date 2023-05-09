import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileGuard } from '@guards/profile.guard'

import { AppComponent } from './../app.component'
import { PagesComponent } from './pages.component'

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: AppComponent },
      {
        path: 'dashboard',
        canActivate: [ProfileGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'checkin',
        canActivate: [ProfileGuard],
        loadChildren: () =>
          import('./checkin/checkin.module').then(m => m.CheckinModule),
      },
      {
        path: 'usuario',
        canActivate: [ProfileGuard],
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'pessoa',
        canActivate: [ProfileGuard],
        loadChildren: () =>
          import('./person/person.module').then(m => m.PersonModule),
      },
      {
        path: 'turma',
        canActivate: [ProfileGuard],
        loadChildren: () =>
          import('./class/class.module').then(m => m.ClassModule),
      },
      {
        path: 'outros',
        loadChildren: () =>
          import('./miscellaneous/miscellaneous.module').then(
            m => m.MiscellaneousModule,
          ),
      },
      { path: '**', redirectTo: 'outros', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
