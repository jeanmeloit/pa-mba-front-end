import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PagesComponent } from './pages.component'

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'pessoa',
        loadChildren: () =>
          import('./person/person.module').then(m => m.PersonModule),
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
