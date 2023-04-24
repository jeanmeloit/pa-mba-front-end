import { Directive, Input } from '@angular/core'

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'pds-dx-column',
})
export class ColumnDirective {
  @Input() public allowExporting?: boolean
  @Input() public allowGrouping?: boolean
  @Input() public autoExpandGroup?: boolean
  @Input() public buttons?: any
  @Input() public calculateGroupValue?: string | ((rowData: any) => any)
  @Input() public cellTemplate?: any
  @Input() public columns?: any
  @Input() public editCellTemplate?: any
  @Input() public groupCellTemplate?: any
  @Input() public groupIndex?: number
  @Input() public headerCellTemplate?: any
  @Input() public showWhenGrouped?: boolean
  @Input() public type?:
    | 'adaptive'
    | 'buttons'
    | 'detailExpand'
    | 'groupExpand'
    | 'selection'
  @Input() public alignment?: 'center' | 'left' | 'right' | undefined
  @Input() public allowEditing?: boolean
  @Input() public allowFiltering?: boolean
  @Input() public allowFixing?: boolean
  @Input() public allowHeaderFiltering?: boolean
  @Input() public allowHiding?: boolean
  @Input() public allowReordering?: boolean
  @Input() public allowResizing?: boolean
  @Input() public allowSearch?: boolean
  @Input() public allowSorting?: boolean
  @Input() public calculateCellValue?: (rowData: any) => any
  @Input() public calculateDisplayValue?: string | ((rowData: any) => any)
  @Input() public calculateFilterExpression?: (
    filterValue: any,
    selectedFilterOperation: string,
    target: string,
  ) => string | any[] | any
  @Input() public calculateSortValue?: string | ((rowData: any) => any)
  @Input() public caption?: string
  @Input() public cssClass?: string
  @Input() public customizeText?: (cellInfo: {
    value?: string | number | Date
    valueText?: string
    target?: string
    groupInterval?: string | number
  }) => string
  @Input() public dataField?: string
  @Input() public dataType?:
    | 'string'
    | 'number'
    | 'date'
    | 'boolean'
    | 'object'
    | 'datetime'
  @Input() public defaultValue?: any | ((newRow: any) => any)
  @Input() public editorOptions?: any
  @Input() public encodeHtml?: boolean
  @Input() public falseText?: string
  @Input() public filterOperations?: (
    | '='
    | '<>'
    | '<'
    | '<='
    | '>'
    | '>='
    | 'notcontains'
    | 'contains'
    | 'startswith'
    | 'endswith'
    | 'between'
  )[]
  @Input() public filterType?: 'exclude' | 'include'
  @Input() public filterValue?: any
  @Input() public filterValues?: any[]
  @Input() public fixed?: boolean
  @Input() public fixedPosition?: 'left' | 'right'
  @Input() public formItem?: any
  @Input() public format?: any
  @Input() public headerFilter?: any
  @Input() public hidingPriority?: number
  @Input() public isBand?: boolean
  // tslint:disable-next-line: max-line-length
  @Input() public lookup?: {
    allowClearing?: boolean
    dataSource?: any
    displayExpr?: string | ((data: any) => string)
    valueExpr?: string
  }
  @Input() public minWidth?: number
  @Input() public name?: string
  @Input() public ownerBand?: number
  @Input() public renderAsync?: boolean
  @Input() public selectedFilterOperation?:
    | '<'
    | '<='
    | '<>'
    | '='
    | '>'
    | '>='
    | 'between'
    | 'contains'
    | 'endswith'
    | 'notcontains'
    | 'startswith'
  @Input() public setCellValue?: (
    newData: any,
    value: any,
    currentRowData: any,
  ) => void | Promise<void> | JQueryPromise<void>
  @Input() public showEditorAlways?: boolean
  @Input() public showInColumnChooser?: boolean
  @Input() public sortIndex?: number
  @Input() public sortOrder?: 'asc' | 'desc' | undefined
  @Input() public sortingMethod?: (value1: any, value2: any) => number
  @Input() public trueText?: string
  @Input() public validationRules?: any[]
  @Input() public visible?: boolean
  @Input() public visibleIndex?: number
  @Input() public width?: number | string
  @Input() public userData?: any

  public getSettings(): any {
    const settings: any = {}
    Object.keys(this)
      .filter(key => !key.startsWith('__'))
      .forEach(key => {
        settings[key] = this[key]
      })
    settings.isColumnDirective = true
    return settings
  }
}
