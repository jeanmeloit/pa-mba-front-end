import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import DevExpress from 'devextreme'
import {
  DxDataGridComponent,
  DxTemplateDirective,
  DxTemplateHost,
  IDxTemplateHost,
  INestedOptionContainer,
  NestedOptionHost,
} from 'devextreme-angular'
import { dxDataGridColumn } from 'devextreme/ui/data_grid'

import { ColumnDirective } from './directives/column.directive'
import { ObjectUtil } from './models'

@Component({
  selector: 'pds-wrapped-dx-grid',
  templateUrl: './wrapped-dx-grid.component.html',
  styleUrls: ['./wrapped-dx-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DxTemplateHost, NestedOptionHost],
})
export class WrappedDxGridComponent
  implements AfterViewInit, INestedOptionContainer, IDxTemplateHost
{
  public optionChangedHandlers: EventEmitter<any>
  public removedOptions: string[]
  public initialSelectedKeys: any[]
  public editData: any = []
  public focusedRowKey: any
  public searchPanelText: string

  @Input() public uniqueId: string
  @Input() public keyExpr: string = 'id'
  @Input() public pageSize: number = 10
  @Input() public allowedPageSizes: any[] = [10, 20, 50]
  @Input() public enableFilterRow: boolean = true
  @Input() public enablePageSizeSelector: boolean = true
  @Input() public enableStorage: boolean = false
  @Input() public enableColumnChoser: boolean = true
  @Input() public enableExport: boolean = true
  @Input() public enableExportWrap: boolean = true
  @Input() public enableExportFilter: boolean = true
  @Input() public enableHeaderFilter: boolean = true
  @Input() public editable = false
  @Input() public editMode: 'batch' | 'cell' | 'row' | 'form' = 'form'
  @Input() public showBorders = false
  @Input() public showColumnLines = false
  @Input() public showRowLines = false
  @Input() public dataManagerKey: string
  @Input() public showSelection: boolean
  @Input() public selectMode: 'none' | 'single' | 'multiple' = 'multiple'
  @Input() public checkboxesMode: 'always' | 'none' | 'onClick' | 'onLongTap' =
    'onClick'
  @Input() public allowSelectAll = true
  @Input() public selectAllMode: 'allPages' | 'page' = 'allPages'
  @Input() public checkUnsavedChanges = true
  @Input() public selectedRowKeys: any[]
  @Input() public disabled = false
  @Input() public repaintChangesOnly = false
  @Input() public allowColumnResizing = true
  @Input() public allowAdding = false
  @Input() public allowUpdating = true
  @Input() public allowDeleting = false
  @Input() public allowReordering = false
  @Input() public showDragIcons = true
  @Input() public onReorder: (e: any) => void
  @Input() public loadPanelEnabled = true
  @Input() public grouped = true
  @Input() public selection = false
  @Input() public groupPanelVisible = true
  @Input() public autoExpandGroups = false
  @Input() public sortMode: 'none' | 'single' | 'multiple' = 'none'
  @Input() public allowColumnFixing = false
  @Input() public customizeColumns: (columns: ColumnDirective[]) => void
  @Input() public showSearchPanel = true
  @Input() public searchPanelPlaceholder: string = 'Pesquisar'
  @Input() public exportFileName: string = 'pds-file'
  @Input() public storageKey: string = 'pds-grid-storage'
  @Input() public groupPanelText: string =
    'Arraste uma coluna aqui para agrupar por ela'
  @Input() public remoteOperations:
    | boolean
    | {
        filtering?: boolean
        grouping?: boolean
        groupPaging?: boolean
        paging?: boolean
        sorting?: boolean
        summary?: boolean
      }
  @Input() public editTexts: {
    addRow?: string
    cancelAllChanges?: string
    cancelRowChanges?: string
    confirmDeleteMessage?: string
    confirmDeleteTitle?: string
    deleteRow?: string
    editRow?: string
    saveAllChanges?: string
    saveRowChanges?: string
    undeleteRow?: string
    validationCancelChanges?: string
  } = {}

  @Output() public editStart = new EventEmitter<any>()
  @Output() public editorPreparing = new EventEmitter<any>()
  @Output() public initNewRow = new EventEmitter<any>()
  @Output() public rowUpdated = new EventEmitter<any>()
  @Output() public rowInserted = new EventEmitter<any>()
  @Output() public rowInserting = new EventEmitter<any>()
  @Output() public rowPrepared = new EventEmitter<any>()
  @Output() public cellPrepared = new EventEmitter<any>()
  @Output() public doubleClickRow = new EventEmitter<any>()
  @Output() public selectedRowKeysChange = new EventEmitter<any[]>()
  @Output() public validating = new EventEmitter<any>()
  @Output() public contentReady = new EventEmitter<any>()
  @Output() public toolbarPreparing = new EventEmitter<any>()
  @Output() public showFilterChange = new EventEmitter<any>()

  private _data:
    | any[]
    | DevExpress.data.DataSource
    | DevExpress.data.DataSourceOptions
  private _dataGrid: DxDataGridComponent
  private _pendingTemplates: DxTemplateDirective[] = []
  private _pendingColumns: ColumnDirective[] = []
  private _contentColumns: QueryList<ColumnDirective>
  private _changes: { [key: string]: any } = {}
  private _isDirty = false
  private _showFilter = false

  constructor(
    private _optionHost: NestedOptionHost,
    private _templateHost: DxTemplateHost,
    private _renderer: Renderer2,
    private _objectUtil: ObjectUtil,
  ) {
    this.optionChangedHandlers = new EventEmitter<any>()
    this._optionHost.setHost(this)
    this._templateHost.setHost(this)
  }

  @Input() public set data(
    value:
      | any[]
      | DevExpress.data.DataSource
      | DevExpress.data.DataSourceOptions,
  ) {
    this._data = value
  }

  public get data():
    | any[]
    | DevExpress.data.DataSource
    | DevExpress.data.DataSourceOptions {
    return this._data
  }

  @ViewChild(DxDataGridComponent) public set dataGrid(
    value: DxDataGridComponent,
  ) {
    this._dataGrid = value
    if (this._dataGrid) {
      this.instance.beginUpdate()
      this.setGridTemplates()
      this.setGridColumns(true)
      this.instance.endUpdate()
    }
  }

  public get dataGrid(): DxDataGridComponent {
    return this._dataGrid
  }

  @ContentChildren(ColumnDirective, { descendants: false })
  public set contentColumns(columns: QueryList<ColumnDirective>) {
    this._pendingColumns = this._pendingColumns.concat(
      columns.map(x => x.getSettings()),
    )
    this._contentColumns = columns
    this.setGridColumns()
  }

  public get contentColumns(): QueryList<ColumnDirective> {
    return this._contentColumns
  }

  public get instance(): any {
    return this.dataGrid?.instance
  }

  public get isLinked(): boolean {
    return this.dataGrid.isLinked
  }

  public get removedNestedComponents(): string[] {
    // tslint:disable-next-line: no-string-literal
    return this.dataGrid.instance['removedNestedComponents']
  }

  public get recreatedNestedComponents(): any[] {
    // tslint:disable-next-line: no-string-literal
    return this.dataGrid.instance['recreatedNestedComponents']
  }

  public set isDirty(value: boolean) {
    this._isDirty = value
  }

  public get isDirty(): boolean {
    return this._isDirty
  }

  @Input() public set showFilter(value: boolean) {
    this._showFilter = value
    this.showFilterChange.emit(this._showFilter)
  }

  public get showFilter(): boolean {
    return this._showFilter
  }

  public get changes(): { [key: string]: any } {
    return this._changes
  }

  public get changesArray(): any[] {
    const values: any[] = []
    Object.keys(this._changes).forEach(key => {
      values.push(this._changes[key])
    })
    return values
  }

  public get filterValue(): any {
    return this.dataGrid?.filterValue
  }

  public ngAfterViewInit(): void {
    // forceAdd, if there are columns from the wrapper they will be in the data grid by now
    this.setGridColumns(true)
    setTimeout(() => {
      if (this.dataGrid && this.initialSelectedKeys?.length) {
        this.dataGrid.instance.selectRows(this.initialSelectedKeys, false)
        this.initialSelectedKeys = null
      }
    }, 1)
  }

  public resetOptions = (collectionName?: string) =>
    this.dataGrid?.resetOptions(collectionName)
  public isRecreated = (name: string) => this.dataGrid?.isRecreated(name)

  public setTemplate(template: DxTemplateDirective): void {
    this._pendingTemplates.push(template)
  }

  public onRowUpdated(event: any): void {
    if (!this.editable) {
      return
    }
    this._changes[event.key] = event.data
    this._isDirty = true
    this.rowUpdated.emit(event)
  }

  public onRowInserted(event: any): void {
    if (!this.editable) {
      return
    }
    this._changes[event.key] = event.data
    this._isDirty = true
  }

  public onRowRemoved(event: any): void {
    if (!this.editable) {
      return
    }
    this._changes[event.key] = null
    this._isDirty = true
  }

  public onRowValidating(event: any): void {
    this.validating.emit(event)
  }

  public onToolbarPreparing(event: any): void {
    this.toolbarPreparing.emit(event)
  }

  public onInitNewRow(e: any): void {
    this.scrollToTop()
    this._contentColumns.forEach(column => {
      if (column.defaultValue !== undefined && column.dataField) {
        if (column.defaultValue instanceof Function) {
          e.data[column.dataField] = column.defaultValue(e.data)
        } else {
          e.data[column.dataField] = column.defaultValue
        }
      }
    })

    this.initNewRow.emit(e)
  }

  public onRowPrepared(event: any): void {
    // since data might be lazy loaded from the server, event.data will not always be populated
    if (event.data) {
      if (event.rowType === 'group') {
        this._renderer.setAttribute(
          event.rowElement,
          'group-ex-key',
          event.data.key,
        )
      } else if (event.rowType === 'data') {
        this._renderer.setAttribute(
          event.rowElement,
          'data-ex-key',
          event.data[this.keyExpr],
        )
        this._renderer.setAttribute(
          event.rowElement,
          'data-ex-name',
          event.data.entityId || event.data.name,
        )
      }
    }
    this.rowPrepared.emit(event)
  }

  public clearChanges(): void {
    this._changes = {}
    this.dataGrid.instance.cancelEditData()
    this._isDirty = false
  }

  public onSelectionChanged(event: any): void {
    this.selectedRowKeysChange.emit(event.selectedRowKeys)
  }

  public onKeyDown(e: any): void {
    switch (e.event.keyCode) {
      case 13: // enter
        if (this.showSelection && this.focusedRowKey) {
          e.handled = true
          this.dataGrid.instance.selectRows([this.focusedRowKey], false)
        }
        break
      case 27: // escape
        if (this.showSelection) {
          e.handled = true
          this.dataGrid.instance.clearSelection()
        }
        break
      case 38: // Up Arrow
        if (e.event.altKey) {
          e.handled = true
          e.event.stopPropagation()
          this.previousItemAsync()
        }
        break
      case 40: // Down Arrow
        if (e.event.altKey) {
          e.handled = true
          e.event.stopPropagation()
          this.nextItemAsync()
        }
        break

      default:
        break
    }
  }

  public async rowDoubleClickAsync(event: any): Promise<any> {
    this.doubleClickRow.emit(event)
  }

  public repaint(): void {
    try {
      this.dataGrid?.instance?.repaint()
    } catch (e) {}
  }

  public refresh(): void {
    try {
      this.dataGrid?.instance?.refresh()
    } catch (e) {}
  }

  public addRow(): void {
    try {
      this.closeEditCell()
      setTimeout(() => {
        this.dataGrid?.instance?.addRow()
      }, 10)
    } catch (e) {}
  }

  public closeEditCell(): void {
    try {
      this.focus()
    } catch (e) {}
  }

  public focus(): void {
    try {
      this.instance?.focus()
    } catch (e) {}
  }

  public clearFilter(): void {
    try {
      if (this.dataGrid) {
        this.dataGrid.filterValue = null
      }
    } catch (e) {}
  }

  public refreshGridColumns(): void {
    try {
      if (this.dataGrid && this.dataGrid.instance) {
        const columns = this._contentColumns.map(x => x.getSettings())
        const newColumns = this._objectUtil.deepAssign(
          [],
          this._dataGrid.columns,
        ) as any[]
        for (const element of columns) {
          const index = newColumns.findIndex(
            x => (x as dxDataGridColumn).dataField === element.dataField,
          )
          if (index !== -1) {
            newColumns[index] = element
          } else {
            newColumns.push(element)
          }
        }
        this._dataGrid._setOption('columns', newColumns)
      }
    } catch (e) {}
  }

  public onContentReady(e: any): void {
    const keys = Object.keys(this._changes)
    if (e.component.hasEditData() || keys.length > 0) {
      this._isDirty = true
    } else {
      if (this.editMode === 'batch') {
        this._isDirty = false
      }
    }

    this.contentReady.emit(e)
  }

  public async previousItemAsync(): Promise<void> {
    if (!this.showSelection || !this.dataGrid?.instance) {
      return
    }

    let newIndex: number
    if (!this.selectedRowKeys?.length) {
      newIndex = 0
    } else {
      newIndex = Math.max(
        0,
        this.dataGrid.instance.getRowIndexByKey(this.selectedRowKeys[0]) - 1,
      )
    }

    await this.selectIndexAsync(newIndex)
  }

  public async nextItemAsync(): Promise<void> {
    if (!this.showSelection || !this.dataGrid?.instance) {
      return
    }

    let newIndex: number
    if (!this.selectedRowKeys?.length) {
      newIndex = 0
    } else {
      newIndex = Math.min(
        this.dataGrid.instance.totalCount() - 1,
        this.dataGrid.instance.getRowIndexByKey(
          this.selectedRowKeys[this.selectedRowKeys.length - 1],
        ) + 1,
      )
    }

    await this.selectIndexAsync(newIndex)
  }

  public scrollToTop(): void {
    const scrollable = this.instance.getScrollable()
    if (scrollable) {
      scrollable.scrollTo({
        left: 0,
        top: 0,
      })
    }
  }

  public scrollToBottom(): void {
    const scrollable = this.instance.getScrollable()
    if (scrollable) {
      scrollable.scrollTo({
        left: 0,
        top: scrollable.$content().height(),
      })
    }
  }

  public pageUpDown(up: boolean): void {
    const pageStep = up ? -1 : 1
    const scrollable = this.instance.getScrollable()
    if (
      scrollable &&
      scrollable._container().height() < scrollable.$content().height()
    ) {
      scrollable.scrollBy({
        left: 0,
        top: scrollable._container().height() * pageStep,
      })
    }
  }

  public async validateAsync(): Promise<boolean> {
    if (!this.editable || !this.dataGrid?.instance) {
      return
    }

    const validatingController = this.instance.getController('validating')
    if (validatingController) {
      return await validatingController.validate(true)
    }

    return false
  }

  private async selectIndexAsync(index: number): Promise<void> {
    if (!this.showSelection || !this.dataGrid?.instance) {
      return
    }

    const pgSize = this.dataGrid.instance.pageSize()
    const pageIndex = Math.floor(index / pgSize)
    if (pageIndex !== this.dataGrid.instance.pageIndex()) {
      await this.dataGrid.instance.pageIndex(pageIndex)
    }

    const indexOffset = this.instance.getController('data').getRowIndexOffset()
    const newIndex = Math.max(0, index - indexOffset)
    await this.dataGrid.instance.selectRowsByIndexes([newIndex])
    this.dataGrid.instance.navigateToRow(this.selectedRowKeys[0])
  }

  private setGridTemplates(): void {
    if (this._dataGrid) {
      if (this._pendingTemplates.length) {
        while (this._pendingTemplates.length) {
          this._dataGrid.setTemplate(this._pendingTemplates.shift())
        }
        ;(this._dataGrid as any)._initTemplates()
      }
    }
  }

  private setGridColumns(forceAdd: boolean = false): void {
    // if (
    //   this._dataGrid &&
    //   this._pendingColumns.length &&
    //   (this._dataGrid.columns || forceAdd)
    // ) {
    //   this._dataGrid.columns = (this._dataGrid.columns || [])
    //     .filter((x: any) => !x.isColumnDirective)
    //     .concat(this._pendingColumns)
    //   this._pendingColumns = []
    // }
  }
}
