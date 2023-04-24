import {
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
import { NbComponentStatus } from '@nebular/theme'

const valueProvider = {
  provide: NG_VALUE_ACCESSOR,
  // imports: [NgbModule],
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => NebularCheckboxComponent),
  multi: true,
}

@Component({
  selector: 'pds-nebular-checkbox',
  templateUrl: './nebular-checkbox.component.html',
  styleUrls: ['./nebular-checkbox.component.scss'],
  providers: [valueProvider],
})
export class NebularCheckboxComponent implements ControlValueAccessor, OnInit {
  public currentValue: any = ''
  @Input() private formControlName: string
  @Input() public name: string
  @Input() public label: string
  @Input() public disabled?: boolean = false
  @Input() public indeterminate?: boolean = false
  @Input() public status: NbComponentStatus = 'primary'
  @Input() public nebularLabelPosition: string = 'start'

  @Input() public checkboxClick?: ($event: any, that: any) => any
  @Input() public checkboxChange?: ($event: any, that: any) => any
  @Input() public this?: any

  @Input() set value(value: any) {
    this.currentValue = value
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) {}
  public ngOnInit(): void {}

  public getAbsControl(): any {
    if (!this.controlContainer) return null

    return this.controlContainer.control.get(this.formControlName)
  }

  public clickFunction($event: any): void {
    if (this.checkboxClick) {
      this.checkboxClick($event, this.this)
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

    if (this.checkboxChange) {
      this.checkboxChange(event, this.this)
    }
  }
}
