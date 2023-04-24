import { EventEmitter } from '@angular/core'
import {
  NbBadgePosition,
  NbComponentOrCustomStatus,
  NbIconConfig,
} from '@nebular/theme'

export interface NebularTab {
  tabId?: string
  tabTitle?: string
  tabIcon?: NbIconConfig
  template?: string
  badgePosition?: NbBadgePosition
  badgePositionbadgeStatus?: NbComponentOrCustomStatus
  badgeText?: string
  route?: string
  routeParam?: string
  fullWidth?: boolean
  active?: boolean
  badgeDot?: boolean
  disabled?: boolean
  responsive?: boolean
  changeTab?: EventEmitter<any>
}
