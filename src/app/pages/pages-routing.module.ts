import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

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
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'checkin',
        loadChildren: () =>
          import('./checkin/checkin.module').then(m => m.CheckinModule),
      },
      {
        path: 'pessoa',
        loadChildren: () =>
          import('./person/person.module').then(m => m.PersonModule),
      },
      {
        path: 'turma',
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
