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
  useExisting: forwardRef(() => NebularToggleComponent),
  multi: true,
}

@Component({
  selector: 'pds-nebular-toggle',
  templateUrl: './nebular-toggle.component.html',
  styleUrls: ['./nebular-toggle.component.scss'],
  providers: [valueProvider],
})
export class NebularToggleComponent implements ControlValueAccessor, OnInit {
  public currentValue: any = ''
  @Input() private formControlName: string
  @Input() public name: string
  @Input() public label: string
  @Input() public nebularLabel: string
  @Input() public useNebularLabel?: boolean = false
  @Input() public disabled?: boolean = false
  @Input() public checked?: boolean = false
  @Input() public status: NbComponentStatus = 'primary'
  @Input() public nebularLabelPosition: string = 'start'

  @Input() public toggleClick?: ($event: any, that: any) => any
  @Input() public toggleChange?: ($event: any, that: any) => any
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
    if (this.toggleClick) {
      this.toggleClick($event, this.this)
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

    if (this.toggleChange) {
      this.toggleChange(event, this.this)
    }
  }
}
