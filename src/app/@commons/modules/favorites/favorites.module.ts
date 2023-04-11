import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
} from '@nebular/theme'

import {
  FavoritesContainerComponent,
} from './favorites-container/favorites-container.component'

@NgModule({
  declarations: [FavoritesContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbIconModule,
  ],
  exports: [FavoritesContainerComponent],
})
export class FavoritesModule {}
