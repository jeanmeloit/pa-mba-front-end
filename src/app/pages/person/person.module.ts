import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'

import { PersonRoutingModule } from './person-routing.module'
import { PersonComponent } from './person.component'
import { StudentListComponent } from './student-list/student-list.component'
import { StudentComponent } from './student/student.component'

@NgModule({
  declarations: [PersonComponent, StudentComponent, StudentListComponent],
  imports: [CommonModule, CommonsModule, PersonRoutingModule],
})
export class PersonModule {}
