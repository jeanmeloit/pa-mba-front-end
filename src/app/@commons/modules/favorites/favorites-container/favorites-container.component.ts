import { Component, Input, OnInit } from '@angular/core'
import {
  NbButtonAppearance,
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from '@nebular/theme'

@Component({
  selector: 'pds-favorites-container',
  templateUrl: './favorites-container.component.html',
  styleUrls: ['./favorites-container.component.scss'],
})
export class FavoritesContainerComponent implements OnInit {
  @Input() public containerTitle: string

  public favorites: any[] = []

  // TOP RIGHT BUTTON
  public topRightButtonIcon: string
  public topRightButtonType: NbComponentStatus = 'primary'
  public topRightButtonShape: NbComponentShape = 'rectangle'
  public topRightButtonSize: NbComponentSize = 'medium'
  public topRightButtonAppearance: NbButtonAppearance = 'ghost'
  public topRightButtonId: string = 'clear-favorites'
  public topRightButtonTitle: string

  constructor() {}

  public ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites'))
  }

  public clean(): void {
    localStorage.removeItem('favorites')
    this.favorites = []
  }
}
