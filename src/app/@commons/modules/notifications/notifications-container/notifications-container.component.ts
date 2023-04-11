import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  NbButtonAppearance,
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from '@nebular/theme'

@Component({
  selector: 'pds-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss'],
})
export class NotificationsContainerComponent implements OnInit {
  @Input() public containerTitle: string
  @Input() public notificationsData: any = []

  // TOP RIGHT BUTTON
  public topRightButtonIcon: string
  public topRightButtonType: NbComponentStatus = 'primary'
  public topRightButtonShape: NbComponentShape = 'rectangle'
  public topRightButtonSize: NbComponentSize = 'medium'
  public topRightButtonAppearance: NbButtonAppearance = 'ghost'
  public topRightButtonId: string = 'switch-notification-view-mode'
  public topRightButtonTitle: string

  public showingReaded: boolean = false

  @Output()
  private readed: EventEmitter<any> = new EventEmitter()

  constructor() {}

  public ngOnInit(): void {}

  public setAsRead(idAviso: number): void {
    this.readed.emit(idAviso)
  }
}
