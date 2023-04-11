import { NgModule } from '@angular/core'
import { CommonsModule } from '@commons/commons.module'
import ColorPicker from '@misc/color-picker'
import { NbIconLibraries, NbMenuModule } from '@nebular/theme'
import { registerPalette } from 'devextreme/viz/palette'

import { ThemeModule } from '../@theme/theme.module'
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module'
import { PagesRoutingModule } from './pages-routing.module'
import { PagesComponent } from './pages.component'

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    CommonsModule,
  ],
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

    const primaryPalette = {
      simpleSet: ColorPicker.getPrimaryColorScheme().domain,
    }
    const secondaryPalette = {
      simpleSet: ColorPicker.getSecondaryColorScheme().domain,
    }
    const tertiaryPalette = {
      simpleSet: ColorPicker.getTerciaryColorScheme().domain,
    }
    registerPalette('primaryPalette', primaryPalette)
    registerPalette('secondaryPalette', secondaryPalette)
    registerPalette('tertiaryPalette', tertiaryPalette)
  }
}
