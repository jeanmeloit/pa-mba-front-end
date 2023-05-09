import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  NbButtonAppearance,
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from '@nebular/theme'

@Component({
  selector: 'pds-nebular-button',
  templateUrl: './nebular-button.component.html',
  styleUrls: ['./nebular-button.component.scss'],
})
export class NebularButtonComponent implements OnInit {
  @Input()
  public buttonText: string

  @Input()
  public buttonIcon: string

  @Input()
  public nativeType: NbComponentStatus

  @Input()
  public buttonType: NbComponentStatus = 'primary'

  @Input()
  public buttonShape: NbComponentShape = 'rectangle'

  @Input()
  public buttonSize: NbComponentSize = 'small'

  @Input()
  public buttonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public buttonId: string = 'pds-nebular-button-id'

  @Input()
  public buttonTitle: string

  @Input()
  public buttonClass: string

  @Input()
  public buttonVisible: boolean = true

  @Input()
  public buttonIconVisible: boolean = false

  @Input()
  public buttonDisabled: boolean = false

  @Input()
  public buttonFullWidth: boolean = false

  // EMITTER

  @Output()
  private buttonEmitter: EventEmitter<any> = new EventEmitter()

  constructor() {}

  public ngOnInit(): void {}

  public buttonClick(): void {
    this.buttonEmitter.emit()
  }
}
