import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ClassListComponent } from './class-list/class-list.component'
import { ClassComponent } from './class.component'

const routes: Routes = [
  {
    path: '',
    component: ClassComponent,
    children: [
      { path: '', component: ClassListComponent },
      { path: ':id', component: ClassListComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutingModule {}
