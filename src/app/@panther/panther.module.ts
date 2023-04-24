import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbMomentDateModule } from '@nebular/moment'
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbToggleModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme'
import { TextMaskModule } from 'angular2-text-mask'
import {
  DxChartModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxHtmlEditorModule,
  DxPieChartModule,
  DxPopoverModule,
  DxTabPanelModule,
} from 'devextreme-angular'
import { ImageCropperModule } from 'ngx-image-cropper'

import { DefaultPageComponent } from './default-page/default-page.component'
import { DxBarChartComponent } from './dx-bar-chart/dx-bar-chart.component'
import { DxStandardGridComponent } from './dx-standard-grid/dx-standard-grid.component'
import { ChooseFilesComponent } from './file-handling/choose-files/choose-files.component'
import { FileInputComponent } from './file-handling/file-input/file-input.component'
import { FileParser } from './file-handling/misc/file-parser'
import { DragDropDirective } from './image-handling/directives/dragDrop.directive'
import { ImgAdjusterComponent } from './image-handling/img-adjuster/img-adjuster.component'
import { ImgContainerComponent } from './image-handling/img-container/img-container.component'
import { ImageUploadComponent } from './image-upload/image-upload.component'
import { LoadingComponent } from './loading/loading.component'
import { NebularAccordionComponent } from './nebular-accordion/nebular-accordion.component'
import { NebularAutoCompleteComponent } from './nebular-auto-complete/nebular-auto-complete.component'
import { NebularButtonComponent } from './nebular-button/nebular-button.component'
import { NebularCardComponent } from './nebular-card/nebular-card.component'
import { NebularCheckboxComponent } from './nebular-checkbox/nebular-checkbox.component'
import { NebularDialogComponent } from './nebular-dialog/nebular-dialog.component'
import { NebularInputComponent } from './nebular-input/nebular-input.component'
import { NebularSearchInputComponent } from './nebular-search-input/nebular-search-input.component'
import { NebularSelectComponent } from './nebular-select/nebular-select.component'
import { NebularTabsetComponent } from './nebular-tabset/nebular-tabset.component'
import { NebularToggleComponent } from './nebular-toggle/nebular-toggle.component'
import { NebularWindowComponent } from './nebular-window/nebular-window.component'
import { SuggestionBoxComponent } from './suggestion-box/suggestion-box.component'
import { ColumnDirective } from './wrapped-dx-grid/directives/column.directive'
import { WrappedDxGridComponent } from './wrapped-dx-grid/wrapped-dx-grid.component'

@NgModule({
  declarations: [
    DefaultPageComponent,
    NebularButtonComponent,
    NebularInputComponent,
    NebularSelectComponent,
    NebularToggleComponent,
    DxStandardGridComponent,
    NebularCardComponent,
    NebularCheckboxComponent,
    NebularWindowComponent,
    NebularDialogComponent,
    NebularAutoCompleteComponent,
    NebularAccordionComponent,
    SuggestionBoxComponent,
    WrappedDxGridComponent,
    DxBarChartComponent,
    ColumnDirective,
    FileInputComponent,
    ChooseFilesComponent,
    ImageUploadComponent,
    LoadingComponent,
    ImgContainerComponent,
    ImgAdjusterComponent,
    DragDropDirective,
    NebularSearchInputComponent,
    NebularTabsetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbToggleModule,
    NbCheckboxModule,
    NbTooltipModule,
    NbRadioModule,
    NbProgressBarModule,
    NbDatepickerModule,
    NbMomentDateModule,
    NbSpinnerModule,
    NbAccordionModule,
    NbFormFieldModule,
    NbListModule,
    NbAutocompleteModule,
    NbListModule,
    NbAlertModule,
    NbCardModule,
    NbTabsetModule,
    NbPopoverModule,
    NbAccordionModule,
    NbContextMenuModule,
    NbActionsModule,
    NbWindowModule.forChild(),
    DxDataGridModule,
    DxDateBoxModule,
    DxPopoverModule,
    DxPieChartModule,
    DxChartModule,
    DxHtmlEditorModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    ImageCropperModule,
    TextMaskModule,
  ],
  exports: [
    NbListModule,
    NbAlertModule,
    NbCardModule,
    NbTabsetModule,
    NbPopoverModule,
    NbAccordionModule,
    NbRadioModule,
    NbContextMenuModule,
    NbActionsModule,
    NbIconModule,
    NbTooltipModule,
    NbSpinnerModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxPopoverModule,
    DxPieChartModule,
    DxChartModule,
    DxHtmlEditorModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    NebularButtonComponent,
    NebularInputComponent,
    NebularSelectComponent,
    NebularToggleComponent,
    DxStandardGridComponent,
    NebularCardComponent,
    NebularCheckboxComponent,
    NebularWindowComponent,
    NebularDialogComponent,
    NebularAutoCompleteComponent,
    NebularAccordionComponent,
    NebularTabsetComponent,
    WrappedDxGridComponent,
    DxBarChartComponent,
    ColumnDirective,
    DefaultPageComponent,
    SuggestionBoxComponent,
    FileInputComponent,
    ChooseFilesComponent,
    ImageUploadComponent,
    ImgContainerComponent,
    ImgAdjusterComponent,
    LoadingComponent,
    DragDropDirective,
    NebularSearchInputComponent,
  ],
  entryComponents: [ChooseFilesComponent],
  providers: [FileParser],
})
export class PantherModule {}
