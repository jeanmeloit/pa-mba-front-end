import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'
import { ModalInstanciaComponent } from '@dialogs/modal-instancia/modal-instancia.component'
import { NbCardModule, NbIconModule } from '@nebular/theme'

import { SystemContainerComponent } from './system-container/system-container.component'

@NgModule({
  declarations: [SystemContainerComponent, ModalInstanciaComponent],
  imports: [CommonModule, CommonsModule, NbIconModule, NbCardModule],
  exports: [SystemContainerComponent],
})
export class SystemSelectorModule {}
