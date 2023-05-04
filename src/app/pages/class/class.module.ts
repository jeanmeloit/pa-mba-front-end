import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'

import { ClassGridComponent } from './class-grid/class-grid.component'
import { ClassListComponent } from './class-list/class-list.component'
import { ClassRoutingModule } from './class-routing.module'
import { ClassComponent } from './class.component'

@NgModule({
  declarations: [ClassComponent, ClassGridComponent, ClassListComponent],
  imports: [CommonModule, CommonsModule, ClassRoutingModule],
})
export class ClassModule {}
