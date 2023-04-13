import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  NbButtonAppearance,
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from '@nebular/theme'

@Component({
  selector: 'pds-nebular-card',
  templateUrl: './nebular-card.component.html',
  styleUrls: ['./nebular-card.component.scss'],
})
export class NebularCardComponent implements OnInit {
  // DEPENDENCY INPUTS
  @Input()
  public status: NbComponentStatus

  @Input()
  public size: NbComponentSize

  @Input()
  public accent: NbComponentStatus

  @Input()
  public spinnerSize: NbComponentSize = 'medium'

  @Input()
  public spinnerStatus: NbComponentStatus = 'info'

  @Input()
  public spinnerMessage: string

  @Input()
  public bodyClass: string

  // BOOLEAN INPUTS

  @Input()
  public spinnerActive: boolean = false

  @Input()
  public hasHeader: boolean = false

  @Input()
  public hasFooter: boolean = false

  // GENERAL INPUTS

  @Input()
  public headerText: string = 'Header'

  @Input()
  public headerTextSize: number = 5

  @Input()
  public footerText: string = 'Footer'

  // TOP RIGHT BUTTON
  @Input()
  public topRightButtonText: string

  @Input()
  public topRightButtonIcon: string

  @Input()
  public topRightButtonType: NbComponentStatus = 'primary'

  @Input()
  public topRightButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public topRightButtonSize: NbComponentSize = 'small'

  @Input()
  public topRightButtonAppearance: NbButtonAppearance = 'outline'

  @Input()
  public topRightButtonId: string = 'top-right-button-id'

  @Input()
  public topRightButtonTitle: string

  @Input()
  public topRightButtonVisible: boolean = false

  @Input()
  public topRightButtonIconVisible: boolean = false

  @Input()
  public topRightButtonDisabled: boolean = false

  // ------------------

  // EMITTERS

  @Output()
  private topRightButtonEmitter: EventEmitter<any> = new EventEmitter()

  constructor() {}

  public ngOnInit(): void {}

  public topRightButtonClick(): void {
    this.topRightButtonEmitter.emit()
  }
}
