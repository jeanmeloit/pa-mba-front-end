import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AboutComponent } from './about/about.component'
import { MiscellaneousComponent } from './miscellaneous.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { SearchResultsComponent } from './search-results/search-results.component'

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    children: [
      { path: '404', component: NotFoundComponent },
      { path: 'busca/:term', component: SearchResultsComponent },
      { path: 'sobre', component: AboutComponent },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule {}
