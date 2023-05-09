import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CheckinComponent } from './checkin.component'
import { DailyClassComponent } from './daily-class/daily-class.component'
import { DailyComponent } from './daily/daily.component'

const routes: Routes = [
  {
    path: '',
    component: CheckinComponent,
    children: [
      { path: '', component: DailyComponent },
      { path: ':date/:classUuid', component: DailyClassComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckinRoutingModule {}
