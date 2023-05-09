import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
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
  NbIconConfig,
  NbSelectAppearance,
} from '@nebular/theme'
import { createNumberMask } from 'text-mask-addons'

import { MoneyPipe } from './../../@commons/pipes/money/money.pipe'

const valueProvider = {
  provide: NG_VALUE_ACCESSOR,
  // imports: [NgbModule],
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => NebularInputComponent),
  multi: true,
}

@Component({
  selector: 'pds-nebular-input',
  templateUrl: './nebular-input.component.html',
  styleUrls: ['./nebular-input.component.scss'],
  providers: [valueProvider],
})
export class NebularInputComponent implements ControlValueAccessor, OnInit {
  public currentValue: any = ''

  @Input() private formControlName: string
  @Input() public name: string
  @Input() public label: string
  @Input() public type: string = 'text'
  @Input() public style: string = 'basic'
  @Input() public pattern: string
  @Input() public placeholder: string
  @Input() public maxlength?: number
  @Input() public disabled?: boolean = false
  @Input() public readonly?: boolean = false
  @Input() public class?: string
  @Input() public autocomplete?: boolean = true
  @Input() public errorMessage?: string = 'Favor preencher o campo'
  @Input() public invalidMessage?: string = 'Favor preencher o campo'
  @Input() public hasInputAppend?: boolean = true
  public _required: boolean = false
  @Input() public mask?: any = { mask: false }
  @Input() public primaryMask?: any = { mask: false }
  @Input() public rows?: number = 12
  @Input() public minDate?: any
  @Input() public maxDate?: any

  @Input() public tooltip: string
  @Input() public tooltipIcon: NbIconConfig
  @Input() public tooltipTrigger: string = 'hover'
  @Input() public tooltipPlacement: string = 'top'
  @Input() public tooltipStatus: NbComponentStatus = 'info'
  @Input() public tooltipAccessorStatus: NbComponentStatus = 'info'
  @Input() public tooltipAccessorIcon: string = 'question-mark-circle'
  @Input() public tooltipAccessorIconPack: string = 'eva'

  @Input() public hasFullWidth: boolean = true
  @Input() public selectValues: any

  @Input() public showSuffixIcon: boolean = false
  @Input() public primarySuffixIcon: boolean = false
  @Input() public suffixDisabled: boolean = false
  @Input() public suffixStatus: NbComponentStatus = 'primary'
  @Input() public suffixIconPack: string = 'eva'
  @Input() public firstSuffixIcon: string = 'eye-outline'
  @Input() public secondSuffixIcon: string = 'eye-off-outline'

  @Input() public size: NbComponentSize = 'medium'
  @Input() public status: NbComponentStatus = 'basic'
  @Input() public shape: NbComponentShape = 'rectangle'
  @Input() public selectAppearance: NbSelectAppearance = 'filled'

  @Input() public inputClick?: ($event: any, that: any) => any
  @Input() public inputChange?: ($event: any, that: any) => any
  @Input() public this?: any

  @Output() public blured = new EventEmitter<any>()

  @Output()
  private iconButtonEmitter: EventEmitter<any> = new EventEmitter()

  public moneyMask: any = {
    mask: createNumberMask({
      prefix: 'R$ ',
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '.',
    }),
  }
  public decimalMask: any = {
    mask: createNumberMask({
      prefix: '',
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '',
    }),
  }
  public numberMask: any = {
    mask: createNumberMask({
      prefix: '',
      allowDecimal: false,
      decimalSymbol: '',
      thousandsSeparatorSymbol: '',
    }),
  }

  @Input()
  public set required(r: boolean | string) {
    this._required = this.convertToBoolean(r)
  }

  @Input() set value(value: any) {
    if (this.type === 'decimal') {
      this.currentValue = this.money.transformDecimal(value)
      this.type = 'text'
    }
    if (this.type === 'number') {
      this.currentValue = this.money.transformNumber(value)
    }
    if (this.type === 'money') {
      this.primaryMask = this.moneyMask
      this.type = 'text'
    }
    if (this.type === 'radio') {
      this.currentValue = value
    } else this.currentValue = value
  }

  @Input()
  public set invalid(v: any) {
    if (this.getAbsControl()) {
      const error = v.invalid === true ? { invalid: true } : null

      this.getAbsControl().setErrors(error)
    }
  }

  private propagateChange: any = () => {}

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private money: MoneyPipe,
  ) {}

  public ngOnInit(): void {}

  public getAbsControl(): any {
    if (!this.controlContainer) return null
    return this.controlContainer.control.get(this.formControlName)
  }

  public getStatus(): string {
    const { errors, invalid, pristine, touched } =
      this.controlContainer.control.get(this.formControlName)

    if (
      errors &&
      Object.keys(errors).length &&
      invalid &&
      !pristine &&
      !touched
    )
      return 'danger'
    else return this.status

    //   submited &&
    //  control.errors?.pattern &&
    //  control?.invalid &&
    //   !control?.pristine &&
    //   !control?.touched
    //     ? 'danger'
    //     : control?.invalid &&
    //       !control?.pristine &&
    //       !control?.touched &&
    //       control.errors?.required
    //     ? 'danger'
    //     : 'basic'
    // "
  }

  public getTooltipIconClass(): string {
    const temp = this.tooltipAccessorIcon

    if (this.tooltipAccessorIcon) {
      return temp
    } else {
      return 'fas fa-question-circle'
    }
  }

  public clickFunction($event: any): void {
    if (this.inputClick) {
      this.inputClick($event, this.this)
    }
  }

  public registerOnTouched(fn: () => void): void {}

  public writeValue(value: any): void {
    this.currentValue = value
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  public modelChanged(event: any): void {
    this.propagateChange(event)

    if (this.inputChange) {
      this.inputChange(event, this.this)
    }
  }

  public convertToBoolean(input: any): boolean | undefined {
    try {
      return JSON.parse(input)
    } catch (e) {
      return undefined
    }
  }

  public iconButtonClick(): void {
    this.iconButtonEmitter.emit()
  }
}
