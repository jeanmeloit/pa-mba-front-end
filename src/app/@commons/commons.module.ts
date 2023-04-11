import { ScrollingModule } from '@angular/cdk/scrolling'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbDialogModule } from '@nebular/theme'
import { PantherModule } from '@src/app/@design-tools/panther.module'
import { TextMaskModule } from 'angular2-text-mask'

import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component'
import { InfoComponent } from './dialogs/info/info.component'
import { ListaSelecaoComponent } from './dialogs/lista-selecao/lista-selecao.component'
import { SearchDialogComponent } from './dialogs/search-dialog/search-dialog.component'
import { ViewPdfComponent } from './dialogs/view-pdf/view-pdf.component'
import { CpfCnpjPipe } from './pipes/cpf-cnpj/cpf-cnpj.pipe'
import { MoneyPipe } from './pipes/money/money.pipe'
import { PhonePipe } from './pipes/phone-pipe/phone.pipe'
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe'
import { SanitizePipe } from './pipes/sanitize/sanitize.pipe'

@NgModule({
  declarations: [
    InfoComponent,
    ConfirmationComponent,
    ListaSelecaoComponent,
    ViewPdfComponent,
    CpfCnpjPipe,
    PhonePipe,
    SafeHtmlPipe,
    SanitizePipe,
    MoneyPipe,
    SearchDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PantherModule,
    TextMaskModule,
    NbDialogModule.forRoot(),
    ScrollingModule,
  ],
  providers: [CpfCnpjPipe, PhonePipe, SafeHtmlPipe, SanitizePipe, MoneyPipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PantherModule,
    TextMaskModule,
    InfoComponent,
    ConfirmationComponent,
    ListaSelecaoComponent,
    ViewPdfComponent,
    SafeHtmlPipe,
    CpfCnpjPipe,
    SanitizePipe,
    MoneyPipe,
  ],
  entryComponents: [
    InfoComponent,
    ConfirmationComponent,
    ListaSelecaoComponent,
    ViewPdfComponent,
  ],
})
export class CommonsModule {}
