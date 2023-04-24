import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DxColumnInterface } from '@panther/interfaces/column-interface'

@Component({
  selector: 'pds-dx-standard-grid',
  templateUrl: './dx-standard-grid.component.html',
  styleUrls: ['./dx-standard-grid.component.scss'],
})
export class DxStandardGridComponent implements OnInit {
  @Input()
  public dataSource: any[]
  @Input()
  public columnsSource: DxColumnInterface[]

  @Input()
  public gridId: string = 'dx-standard-grid'
  @Input()
  public enableColumnReordering: boolean = true
  @Input()
  public enableColumnResizing: boolean = true
  @Input()
  public enableColumnAutoWidth: boolean = true
  @Input()
  public showColumnLines: boolean = false
  @Input()
  public showRowLines: boolean = false
  @Input()
  public showBorders: boolean = false
  @Input()
  public enableRowAlternation: boolean = false
  @Input()
  public enableWordWrap: boolean = true
  @Input()
  public enableLoadPanel: boolean = false
  @Input()
  public enableColumnChoser: boolean = true
  @Input()
  public enableGroupPanel: boolean = true
  @Input()
  public enableColumnFixing: boolean = true
  @Input()
  public enableExport: boolean = true
  @Input()
  public enableExportWrap: boolean = true
  @Input()
  public enableExportFilter: boolean = true
  @Input()
  public enablePageSizeSelector: boolean = true
  @Input()
  public enableHeaderFilter: boolean = true
  @Input()
  public enableFilterRow: boolean = true
  @Input()
  public enableSearchPanel: boolean = true
  @Input()
  public enableStorage: boolean = false
  @Input()
  public enableSelection: boolean = false

  @Input()
  public exportFileName: string = 'pds-file'
  @Input()
  public storageKey: string = 'pds-grid-storage'
  @Input()
  public searchPanelPlaceholder: string = 'Pesquisar'
  @Input()
  public keyExpression: string

  @Input()
  public pageSize: number = 10
  @Input()
  public allowedPageSizes: any[] = [10, 20, 50]

  @Input()
  public selectedRowKeys: Array<any>
  @Output()
  public rowSelected: EventEmitter<any> = new EventEmitter()

  constructor() {}

  public ngOnInit(): void {}

  public emitSelection($event): void {
    this.rowSelected.emit(this.selectedRowKeys)
  }
}
