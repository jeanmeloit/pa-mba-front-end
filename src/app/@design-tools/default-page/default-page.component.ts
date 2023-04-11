import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  NbButtonAppearance,
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from '@nebular/theme'

@Component({
  selector: 'pds-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss'],
})
export class DefaultPageComponent implements OnInit {
  @Input()
  public mainTitle: string = 'Interface padrão para formulários'

  @Input()
  public bottomDivisorVisible: boolean = true

  // SPINNER
  @Input()
  public spinnerSize: NbComponentSize = 'medium'

  @Input()
  public spinnerStatus: NbComponentStatus = 'info'

  @Input()
  public spinnerMessage: string = ''

  @Input()
  public spinnerActive: boolean = false

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

  // BOTTOM LEFT BUTTON
  @Input()
  public bottomLeftButtonText: string

  @Input()
  public bottomLeftButtonIcon: string

  @Input()
  public bottomLeftButtonType: NbComponentStatus = 'info'

  @Input()
  public bottomLeftButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public bottomLeftButtonSize: NbComponentSize = 'small'

  @Input()
  public bottomLeftButtonAppearance: NbButtonAppearance = 'outline'

  @Input()
  public bottomLeftButtonId: string = 'bottom-left-button-id'

  @Input()
  public bottomLeftButtonTitle: string

  @Input()
  public bottomLeftButtonVisible: boolean = false

  @Input()
  public bottomLeftButtonIconVisible: boolean = false

  @Input()
  public bottomLeftButtonDisabled: boolean = false

  // ------------------

  // RIGHT APPROVE BUTTON
  @Input()
  public rightApproveButtonText: string = 'Confirmar'

  @Input()
  public rightApproveButtonIcon: string

  @Input()
  public rightApproveButtonType: NbComponentStatus = 'success'

  @Input()
  public rightApproveButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public rightApproveButtonSize: NbComponentSize = 'small'

  @Input()
  public rightApproveButtonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public rightApproveButtonId: string = 'right-approve-button-id'

  @Input()
  public rightApproveButtonTitle: string

  @Input()
  public rightApproveButtonVisible: boolean = false

  @Input()
  public rightApproveButtonIconVisible: boolean = false

  @Input()
  public rightApproveButtonDisabled: boolean = false

  // ------------------

  // RIGHT DENY BUTTON
  @Input()
  public rightDenyButtonText: string = 'Cancelar'

  @Input()
  public rightDenyButtonIcon: string

  @Input()
  public rightDenyButtonType: NbComponentStatus = 'danger'

  @Input()
  public rightDenyButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public rightDenyButtonSize: NbComponentSize = 'small'

  @Input()
  public rightDenyButtonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public rightDenyButtonId: string = 'right-deny-button-id'

  @Input()
  public rightDenyButtonTitle: string

  @Input()
  public rightDenyButtonVisible: boolean = false

  @Input()
  public rightDenyButtonIconVisible: boolean = false

  @Input()
  public rightDenyButtonDisabled: boolean = false

  // ------------------

  // RIGHT CUSTOM BUTTON
  @Input()
  public rightCustomButtonText: string = 'Custom'

  @Input()
  public rightCustomButtonIcon: string

  @Input()
  public rightCustomButtonType: NbComponentStatus = 'primary'

  @Input()
  public rightCustomButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public rightCustomButtonSize: NbComponentSize = 'small'

  @Input()
  public rightCustomButtonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public rightCustomButtonId: string = 'right-custom-button-id'

  @Input()
  public rightCustomButtonTitle: string

  @Input()
  public rightCustomButtonVisible: boolean = false

  @Input()
  public rightCustomButtonIconVisible: boolean = false

  @Input()
  public rightCustomButtonDisabled: boolean = false

  // ------------------

  //RIGHT ANOTHER BUTTON
  @Input()
  public rightAnotherButtonText: string = 'Another'

  @Input()
  public rightAnotherButtonIcon: string

  @Input()
  public rightAnotherButtonType: NbComponentStatus = 'primary'

  @Input()
  public rightAnotherButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public rightAnotherButtonSize: NbComponentSize = 'small'

  @Input()
  public rightAnotherButtonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public rightAnotherButtonId: string = 'right-another-button-id'

  @Input()
  public rightAnotherButtonTitle: string

  @Input()
  public rightAnotherButtonVisible: boolean = false

  @Input()
  public rightAnotherButtonIconVisible: boolean = false

  @Input()
  public rightAnotherButtonDisabled: boolean = false

  // ------------------

  // EMITTERS

  @Output()
  private topRightButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private bottomLeftButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightApproveButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightDenyButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightCustomButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightAnotherButtonEmitter: EventEmitter<any> = new EventEmitter()

  constructor() {}

  public ngOnInit(): void {}

  public topRightButtonClick(): void {
    this.topRightButtonEmitter.emit()
  }

  public bottomLeftButtonClick(): void {
    this.bottomLeftButtonEmitter.emit()
  }

  public rightApproveButtonClick(): void {
    this.rightApproveButtonEmitter.emit()
  }

  public rightDenyButtonClick(): void {
    this.rightDenyButtonEmitter.emit()
  }

  public rightCustomButtonClick(): void {
    this.rightCustomButtonEmitter.emit()
  }

  public rightAnotherButtonClick(): void {
    this.rightAnotherButtonEmitter.emit()
  }
}
