import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbUserModule,
} from '@nebular/theme'

import {
  NotificationsContainerComponent,
} from './notifications-container/notifications-container.component'

@NgModule({
  declarations: [NotificationsContainerComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
  ],
  exports: [NotificationsContainerComponent],
})
export class NotificationsModule {}
