import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'

import { UserGridComponent } from './user-grid/user-grid.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserRoutingModule } from './user-routing.module'
import { UserComponent } from './user.component'

@NgModule({
  declarations: [UserComponent, UserListComponent, UserGridComponent],
  imports: [CommonModule, CommonsModule, UserRoutingModule],
})
export class UserModule {}
