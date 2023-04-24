import {
  AfterViewInit,
  Component,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core'
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import {
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
  NbSelectAppearance,
} from '@nebular/theme'

const valueProvider = {
  provide: NG_VALUE_ACCESSOR,
  // imports: [NgbModule],
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => NebularSelectComponent),
  multi: true,
}

@Component({
  selector: 'pds-nebular-select',
  templateUrl: './nebular-select.component.html',
  styleUrls: ['./nebular-select.component.scss'],
  providers: [valueProvider],
})
export class NebularSelectComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  public currentValue: any = ''
  public _required: boolean = false
  @Input() private formControlName: string
  @Input() public name: string
  @Input() public label: string
  @Input() public placeholder: string
  @Input() public disabled?: boolean
  @Input() public selected: string
  @Input() public selectedValue: string
  @Input() public hasFullWidth: boolean = true
  @Input() public useKeyValue: boolean = false
  @Input() public selectValues: any

  @Input() public size: NbComponentSize = 'medium'
  @Input() public status: NbComponentStatus = 'basic'
  @Input() public shape: NbComponentShape = 'rectangle'
  @Input() public selectAppearance: NbSelectAppearance = 'outline'

  @Input() public selectClick?: ($event: any, that: any) => any
  @Input() public selectChange?: ($event: any, that: any) => any
  @Input() public this?: any

  @Input() set value(value: any) {
    this.currentValue = value
  }

  @Input()
  public set required(r: boolean | string) {
    this._required = this.convertToBoolean(r)
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    if (this.selected) this.selectedValue = this.selected
  }

  public getAbsControl(): any {
    if (!this.controlContainer) return null

    return this.controlContainer.control.get(this.formControlName)
  }

  public clickFunction($event: any): void {
    if (this.selectClick) {
      this.selectClick($event, this.this)
    }
  }

  private propagateChange: any = () => {}

  public registerOnTouched(fn: () => void): void {}

  public writeValue(value: any): void {
    this.currentValue = value
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  public modelChanged(event: any): void {
    this.propagateChange(event)

    if (this.selectChange) {
      this.selectChange(event, this.this)
    }
  }

  public convertToBoolean(input: any): boolean | undefined {
    try {
      return JSON.parse(input)
    } catch (e) {
      return undefined
    }
  }
}
