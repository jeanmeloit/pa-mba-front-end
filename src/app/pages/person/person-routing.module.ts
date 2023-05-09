import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PersonComponent } from './person.component'
import { StudentListComponent } from './student-list/student-list.component'
import { StudentGridComponent } from './student-grid/student-grid.component'

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    children: [
      { path: 'aluno', component: StudentListComponent },
      { path: 'aluno/:id', component: StudentGridComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
