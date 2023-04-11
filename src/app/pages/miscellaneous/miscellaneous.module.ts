import { NgModule } from '@angular/core'
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme'
import { ThemeModule } from '@theme/theme.module'

import { AboutComponent } from './about/about.component'
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module'
import { MiscellaneousComponent } from './miscellaneous.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { SearchResultsComponent } from './search-results/search-results.component'

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbAlertModule,
    NbIconModule,
    MiscellaneousRoutingModule,
  ],
  declarations: [
    MiscellaneousComponent,
    NotFoundComponent,
    SearchResultsComponent,
    AboutComponent,
  ],
})
export class MiscellaneousModule {}
