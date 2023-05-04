import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'
import { NbIconLibraries, NbMenuModule } from '@nebular/theme'

import { ThemeModule } from '../@theme/theme.module'
import { PagesRoutingModule } from './pages-routing.module'
import { PagesComponent } from './pages.component'

@NgModule({
  imports: [PagesRoutingModule, ThemeModule, NbMenuModule, CommonsModule],
  declarations: [PagesComponent],
})
export class PagesModule {
  constructor(iconsLibrary: NbIconLibraries) {
    iconsLibrary.registerFontPack('fa', {
      packClass: 'fa',
      iconClassPrefix: 'fa',
    })
    iconsLibrary.registerFontPack('fab', {
      packClass: 'fab',
      iconClassPrefix: 'fa',
    })
    iconsLibrary.registerFontPack('far', {
      packClass: 'far',
      iconClassPrefix: 'fa',
    })
    iconsLibrary.registerFontPack('fas', {
      packClass: 'fas',
      iconClassPrefix: 'fa',
    })
  }
}
