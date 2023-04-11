import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AnaComponent } from './ana/ana.component'
import { ExamplesComponent } from './examples.component'

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: 'ana',
        component: AnaComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
