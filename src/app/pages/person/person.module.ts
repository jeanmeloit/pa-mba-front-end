import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'

import { PersonRoutingModule } from './person-routing.module'
import { PersonComponent } from './person.component'
import { StudentListComponent } from './student-list/student-list.component'
import { StudentGridComponent } from './student-grid/student-grid.component'

@NgModule({
  declarations: [PersonComponent, StudentGridComponent, StudentListComponent],
  imports: [CommonModule, CommonsModule, PersonRoutingModule],
})
export class PersonModule {}
