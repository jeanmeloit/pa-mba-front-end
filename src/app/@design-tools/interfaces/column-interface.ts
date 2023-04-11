export interface DxFormItemInterface {
  colCount?: number
  colSpan?: number
  component?: any
  cssClass?: string
  dataField?: string
  caption?: string
  editorOptions?: any
  editorType?:
    | string
    | 'dxAutocomplete'
    | 'dxCalendar'
    | 'dxCheckBox'
    | 'dxColorBox'
    | 'dxDateBox'
    | 'dxDropDownBox'
    | 'dxHtmlEditor'
    | 'dxLookup'
    | 'dxNumberBox'
    | 'dxRadioGroup'
    | 'dxRangeSlider'
    | 'dxSelectBox'
    | 'dxSlider'
    | 'dxSwitch'
    | 'dxTagBox'
    | 'dxTextArea'
    | 'dxTextBox'
  helpText?: string
  isRequired?: boolean
  itemType?: 'empty' | 'group' | 'simple' | 'tabbed' | 'button'
  label?: dxLabelInterface
  name?: string
  render?: any
  template?: any
  validationRules?: DxValidatorPattern[]
  visible?: boolean
  visibleIndex?: number
  mode?: string
  children?: DxFormItemInterface[]
  onKeyDown?: Function
}

export interface dxLabelInterface {
  alignment?: string | 'center' | 'left' | 'right'
  location?: string | 'left' | 'right' | 'top'
  showColon?: boolean
  text?: string
  visible?: boolean
}
export interface DxButtonsInterface {
  component?: any
  // Specifies a CSS class to be applied to the button.
  cssClass?: string
  // Specifies the text for the hint that appears when the button is hovered over or long-pressed.
  hint?: string
  // Specifies the button's icon.
  icon?: any | string
  // The name used to identify a built-in button.
  name?: string | 'cancel' | 'delete' | 'edit' | 'save' | 'undelete'
  // A function that is executed when the button is clicked or tapped. Not executed if a template is used.
  onClick?: Function
  // An alias for the template property specified in React. Accepts a rendering function. Refer to Using a Rendering Function for more information.
  render?: any
  // Specifies the button's text. Applies only if the button's icon is not specified.
  text?: string
  visible?: boolean
}

export interface DxLookupInterface {
  allowClearing?: boolean
  calculateCellValue?: any
  dataSource: any
  displayExpr?: string | Function
  valueExpr?: string
}
export interface DxValidatorPattern {
  ignoreEmptyValue?: boolean
  message?: string
  reevaluate?: boolean
  type?: string
  validationCallback?: Function
  pattern?: RegExp
  mesage?: string
}
export interface DxColumnInterface {
  dataField?: string
  caption?: string
  dataType?: string | 'number' | 'date' | 'boolean' | 'object' | 'datetime'
  // In a boolean column, replaces all true items with a specified text. Applies only if showEditorAlways property is false.
  trueText?: string
  // In a boolean column, replaces all false items with a specified text. Applies only if showEditorAlways property is false.
  falseText?: string
  visible?: boolean
  cellTemplate?: string
  editCellTemplate?: string
  allowEditing?: boolean
  allowExporting?: boolean
  allowFiltering?: boolean
  allowHiding?: boolean
  allowResizing?: boolean
  allowSorting?: boolean
  allowSearch?: boolean
  allowGrouping?: boolean
  allowHeaderFiltering?: boolean
  allowReordering?: boolean
  width?: number
  alignment?: string
  hidingPriority?: string | number
  type?: string
  formItem?: DxFormItemInterface
  buttons?: DxButtonsInterface[]
  lookup?: DxLookupInterface
  validators?: DxValidatorPattern[]
  editorOptions?: any
  format?: any
  customizeText?: Function
  setCellValue?: Function
}
