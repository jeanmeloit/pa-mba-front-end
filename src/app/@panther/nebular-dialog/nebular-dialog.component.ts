import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  NbButtonAppearance,
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from '@nebular/theme'

@Component({
  selector: 'pds-nebular-dialog',
  templateUrl: './nebular-dialog.component.html',
  styleUrls: ['./nebular-dialog.component.scss'],
  styles: [
    `
      :host {
        max-height: 90vh;
        max-width: 90vw;
        width: 50vw;
      }
    `,
  ],
})
export class NebularDialogComponent implements OnInit {
  @Input()
  public dialogTitle: string = 'Interface padrão para diálogos'

  @Input()
  public dialogSize: 'small' | 'medium' | 'large' | 'extra-large' = 'large'

  @Input()
  public headerVisible: boolean = true

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

  // RIGHT FIRST BUTTON
  @Input()
  public rightFirstButtonText: string = 'Confirmar'

  @Input()
  public rightFirstButtonIcon: string

  @Input()
  public rightFirstButtonType: NbComponentStatus = 'success'

  @Input()
  public rightFirstButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public rightFirstButtonSize: NbComponentSize = 'small'

  @Input()
  public rightFirstButtonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public rightFirstButtonId: string = 'right-approve-button-id'

  @Input()
  public rightFirstButtonTitle: string

  @Input()
  public rightFirstButtonVisible: boolean = false

  @Input()
  public rightFirstButtonIconVisible: boolean = false

  @Input()
  public rightFirstButtonDisabled: boolean = false

  // ------------------

  // RIGHT SECOND BUTTON
  @Input()
  public rightSecondButtonText: string = 'Custom'

  @Input()
  public rightSecondButtonIcon: string

  @Input()
  public rightSecondButtonType: NbComponentStatus = 'primary'

  @Input()
  public rightSecondButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public rightSecondButtonSize: NbComponentSize = 'small'

  @Input()
  public rightSecondButtonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public rightSecondButtonId: string = 'right-custom-button-id'

  @Input()
  public rightSecondButtonTitle: string

  @Input()
  public rightSecondButtonVisible: boolean = false

  @Input()
  public rightSecondButtonIconVisible: boolean = false

  @Input()
  public rightSecondButtonDisabled: boolean = false

  // ------------------

  //RIGHT THIRD BUTTON
  @Input()
  public rightThirdButtonText: string = 'Another'

  @Input()
  public rightThirdButtonIcon: string

  @Input()
  public rightThirdButtonType: NbComponentStatus = 'primary'

  @Input()
  public rightThirdButtonShape: NbComponentShape = 'rectangle'

  @Input()
  public rightThirdButtonSize: NbComponentSize = 'small'

  @Input()
  public rightThirdButtonAppearance: NbButtonAppearance = 'filled'

  @Input()
  public rightThirdButtonId: string = 'right-another-button-id'

  @Input()
  public rightThirdButtonTitle: string

  @Input()
  public rightThirdButtonVisible: boolean = false

  @Input()
  public rightThirdButtonIconVisible: boolean = false

  @Input()
  public rightThirdButtonDisabled: boolean = false

  // ------------------

  // EMITTERS

  @Output()
  private topRightButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private bottomLeftButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightFirstButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightDenyButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightSecondButtonEmitter: EventEmitter<any> = new EventEmitter()

  @Output()
  private rightThirdButtonEmitter: EventEmitter<any> = new EventEmitter()

  constructor() {}

  public ngOnInit(): void {}

  public topRightButtonClick(): void {
    this.topRightButtonEmitter.emit()
  }

  public bottomLeftButtonClick(): void {
    this.bottomLeftButtonEmitter.emit()
  }

  public rightFirstButtonClick(): void {
    this.rightFirstButtonEmitter.emit()
  }

  public rightDenyButtonClick(): void {
    this.rightDenyButtonEmitter.emit()
  }

  public rightSecondButtonClick(): void {
    this.rightSecondButtonEmitter.emit()
  }

  public rightThirdButtonClick(): void {
    this.rightThirdButtonEmitter.emit()
  }
}
