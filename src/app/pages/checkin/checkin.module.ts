import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'
import { ButtonModule } from 'primeng/button'
import { CarouselModule } from 'primeng/carousel'

import { CheckinRoutingModule } from './checkin-routing.module'
import { CheckinComponent } from './checkin.component'
import { DailyComponent } from './daily/daily.component';
import { DailyClassComponent } from './daily-class/daily-class.component'

@NgModule({
  declarations: [CheckinComponent, DailyComponent, DailyClassComponent],
  imports: [
    CommonModule,
    CommonsModule,
    CheckinRoutingModule,
    CarouselModule,
    ButtonModule,
  ],
})
export class CheckinModule {}
