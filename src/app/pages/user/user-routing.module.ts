import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { UserGridComponent } from './user-grid/user-grid.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserComponent } from './user.component'

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'aluno/:id', component: UserGridComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
