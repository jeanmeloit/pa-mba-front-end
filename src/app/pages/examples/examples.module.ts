import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'

import { AnaComponent } from './ana/ana.component'
import { ExamplesRoutingModule } from './examples-routing.module'
import { ExamplesComponent } from './examples.component'

@NgModule({
  declarations: [ExamplesComponent, AnaComponent],
  imports: [CommonModule, CommonsModule, ExamplesRoutingModule],
})
export class ExamplesModule {}
