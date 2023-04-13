import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CheckinComponent } from './checkin.component'
import { DailyComponent } from './daily/daily.component'

const routes: Routes = [
  {
    path: '',
    component: CheckinComponent,
    children: [{ path: '', component: DailyComponent }],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckinRoutingModule {}
