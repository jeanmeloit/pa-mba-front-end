import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PersonComponent } from './person.component'
import { StudentListComponent } from './student-list/student-list.component'
import { StudentComponent } from './student/student.component'

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    children: [
      { path: 'aluno', component: StudentListComponent },
      { path: 'aluno/:id', component: StudentComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
