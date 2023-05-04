import { Component } from '@angular/core'
import { DefaultConfiguration } from '@config/configuration'

@Component({
  selector: 'pds-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  //Add the windowMode attribute if you want the application to use window mode after certain resolutions
  template: `
    <nb-layout
      [windowMode]="config?.app?.layout?.windowMode"
      [withScroll]="true"
    >
      <nb-layout-header fixed>
        <pds-header></pds-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <pds-footer></pds-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  public config: typeof DefaultConfiguration = DefaultConfiguration
}
