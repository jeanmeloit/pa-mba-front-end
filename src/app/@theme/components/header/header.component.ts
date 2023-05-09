import { Component, OnDestroy, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { DefaultConfiguration } from '@config/configuration'
import { LayoutService } from '@core/utils'
import { RippleService } from '@core/utils/ripple.service'
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSearchService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme'
import themes from 'devextreme/ui/themes'
import { refreshTheme } from 'devextreme/viz/themes'
import { Observable, Subject } from 'rxjs'
import { first, map, takeUntil } from 'rxjs/operators'

import { User } from '../../../auth/interfaces/user.interface'
import { LoginService } from './../../../auth/services/login.service'

@Component({
  selector: 'pds-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>()
  public readonly materialTheme$: Observable<boolean>
  public userPictureOnly: boolean = false
  public user: any
  public currentUser: any = 'Design tools'
  public headerTitle: string = DefaultConfiguration.header.title

  public notificationsData: any
  // private notificationsInterval: any

  public themes: any[] = DefaultConfiguration.header.themes

  public currentTheme: string = 'default'

  public userMenu: NbMenuItem[] = DefaultConfiguration.header.userMenu

  public themeMenu: NbMenuItem[] = DefaultConfiguration.header.themeMenu

  public userData: User
  public config: any

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private searchService: NbSearchService,
    private loginService: LoginService, // private userDataService: UserDataService,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange().pipe(
      map(theme => {
        const themeName: string = theme?.name || ''
        return themeName.startsWith('material')
      }),
    )
  }

  public ngOnInit(): void {
    this.config = DefaultConfiguration
    this.userData = this.loginService.currentUserValue

    this.initializeThemeControls()

    this.initializeMenuControls()

    this.onSearch()
  }

  private initializeThemeControls(): void {
    let theme = localStorage.getItem('theme')
    if (!theme) theme = 'default'

    let devTheme = localStorage.getItem('devExtremeTheme')
    if (!devTheme) devTheme = 'material.nebular.light'

    this.themeService.changeTheme(theme)
    this.currentTheme = this.themeService.currentTheme

    themes.current(devTheme)
    refreshTheme()

    const { xl } = this.breakpointService.getBreakpointsMap()

    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl),
      )

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName
        this.rippleService.toggle(themeName?.startsWith('material'))
      })
  }

  private initializeMenuControls(): void {
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(menu => {
        if (menu.item.data) {
          this.themeService.changeTheme(menu.item.data)
          localStorage.setItem('theme', menu.item.data)

          let devExtremeTheme: string = ''
          if (menu.item.data === 'dark')
            devExtremeTheme = 'material.nebular.dark'
          if (menu.item.data === 'cosmic')
            devExtremeTheme = 'material.nebular.purple'
          if (menu.item.data === 'material-light')
            devExtremeTheme = 'material.material.light'
          if (menu.item.data === 'material-dark')
            devExtremeTheme = 'material.material.dark'
          if (menu.item.data === 'default' || menu.item.data === 'corporate')
            devExtremeTheme = 'material.nebular.light'

          themes.current(devExtremeTheme)
          refreshTheme()
          localStorage.setItem('devExtremeTheme', devExtremeTheme)
        } else if (menu.item.title === 'Nova janela') {
          this.newWindow()
        } else if (menu.item.title === 'Sair') {
          this.redirectToLogout()
        }
      })
  }

  public ngOnDestroy(): void {
    // if (this.notificationsInterval) clearInterval(this.notificationsInterval)
    this.destroy$.next()
    this.destroy$.complete()
  }

  public getLogoBase64(base64: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64,${base64}`,
    )
  }

  private onSearch(): void {
    this.searchService
      .onSearchSubmit()
      .pipe(first())
      .subscribe(({ term }) => {
        this.onSearch()
        this.router.navigate([`outros/busca/${term}`])
      })
  }

  public getFavoritesLength(): number {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
      return favorites.length
    }
  }

  public setAsRead($event: any): void {}

  public newWindow(): void {
    window.open(window.location.href, '_blank').focus()
  }

  public changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName)
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar')
    this.layoutService.changeLayoutSize()

    return false
  }

  public navigateHome() {
    this.menuService.navigateHome()
    return false
  }

  private redirectToLogout(): void {
    this.loginService.logout()
    this.router.navigate(['/auth/login'])
  }
}
