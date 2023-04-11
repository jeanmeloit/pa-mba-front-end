import {
  Component,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core'
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms'
import {
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from '@nebular/theme'

const valueProvider = {
  provide: NG_VALUE_ACCESSOR,
  // imports: [NgbModule],
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => NebularAutoCompleteComponent),
  multi: true,
}

@Component({
  selector: 'pds-nebular-auto-complete',
  templateUrl: './nebular-auto-complete.component.html',
  styleUrls: ['./nebular-auto-complete.component.scss'],
  providers: [valueProvider],
})
export class NebularAutoCompleteComponent implements OnInit {
  public currentValue: any = ''
  public ghostValue: any = ''
  @Input() private formControlName: string
  @Input() public name: string
  @Input() public label: string
  @Input() public placeholder: string
  @Input() public disabled?: boolean
  @Input() public hasFullWidth: boolean = true
  @Input() public results: any
  @Input() public size: NbComponentSize = 'small'
  @Input() public status: NbComponentStatus = 'basic'
  @Input() public shape: NbComponentShape = 'rectangle'

  @Input() public autoCompleteClick?: ($event: any, that: any) => any
  @Input() public autoCompleteChange?: ($event: any, that: any) => any
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

  public test($event): void {
    this.currentValue = $event
    this.ghostValue = this.results.find(item => {
      return item.valor.toString() === $event
    })?.texto
  }

  public getAbsControl(): any {
    if (!this.controlContainer) return null

    return this.controlContainer.control.get(this.formControlName)
  }

  public clickFunction($event: any): void {
    if (this.autoCompleteClick) {
      this.autoCompleteClick($event, this.this)
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

    if (this.autoCompleteChange) {
      this.autoCompleteChange(event, this.this)
    }
  }
}
