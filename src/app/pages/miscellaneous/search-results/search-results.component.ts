import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NbMenuItem } from '@nebular/theme'
import { Subscription } from 'rxjs'

import { MenuUtil } from './../../menu'

@Component({
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public menu: NbMenuItem[] = []
  public result: NbMenuItem[] = []
  public searchTerm: string
  private subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuUtil: MenuUtil,
  ) {}

  public ngOnInit(): void {
    this.menu = this.menuUtil.menuItems
    this.subscription = this.route.params.subscribe(params => {
      this.result = []
      this.searchTerm = params['term']
      this.montarResultado(this.menu, params['term'])
    })
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  private montarResultado(menu: NbMenuItem[], term: string): void {
    menu.forEach(item => {
      if (
        item.link &&
        !item.hidden &&
        item.title.toUpperCase().includes(term.toUpperCase())
      ) {
        this.result.push(item)
      } else if (item.children != null && item.children.length > 0) {
        this.montarResultado(item.children, term)
      }
    })
  }

  public goToSelectedItem(link: string): void {
    this.router.navigate([`${link}`])
  }
}
