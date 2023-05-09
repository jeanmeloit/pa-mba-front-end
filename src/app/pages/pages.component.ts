import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker'
import { ConfirmationComponent } from '@dialogs/confirmation/confirmation.component'
import {
  NbDialogService,
  NbMenuItem,
  NbMenuService,
  NbPopoverDirective,
  NbSidebarService,
} from '@nebular/theme'
import { ToastrService } from '@services/toastr/toastr.service'
import { Subject } from 'rxjs'
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators'

import { LayoutService } from '../@core/utils'
import { MenuUtil } from './menu'

@Component({
  selector: 'pds-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <pds-one-column-layout>
      <nb-menu
        [items]="menu"
        [autoCollapse]="true"
        [nbPopover]="favoriteContext"
        nbPopoverPlacement="right"
        nbPopoverTrigger="noop"
        nbPopoverAdjustment="clockwise"
        nbPopover
      ></nb-menu>
      <router-outlet></router-outlet>
    </pds-one-column-layout>
    <ng-template #favoriteContext>
      <nb-card>
        <nb-card-header>{{ actualMenuData?.completeTitle }}</nb-card-header>
        <nb-card-body>
          <pds-nebular-button
            [buttonVisible]="true"
            [buttonType]="actualIsFavorite ? 'danger' : 'primary'"
            [buttonAppearance]="'outline'"
            [buttonTitle]="
              actualIsFavorite
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'
            "
            [buttonId]="
              actualIsFavorite ? 'remove-from-favorites' : 'add-to-favorites'
            "
            [buttonIcon]="
              actualIsFavorite ? 'fas fa-minus-square' : 'fas fa-star'
            "
            [buttonIconVisible]="true"
            (buttonEmitter)="actualIsFavorite ? removeClick() : addClick()"
          >
          </pds-nebular-button>
        </nb-card-body>
      </nb-card>
    </ng-template>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()

  public actualMenuData: any
  public menu: NbMenuItem[] = []
  public actualIsFavorite: boolean = false

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private swUpdate: SwUpdate,
    private dialogService: NbDialogService,
    private toastr: ToastrService,
    private menuUtil: MenuUtil,
  ) {
    this.checkAppVersion()
    this.menu = this.menuUtil.menuItems
  }

  public ngOnInit(): void {
    this.initializeFavoritesControl()
    this.collapseSideBar()
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  @HostListener('document:click')
  public handleClick(): void {
    if (this.popover?.isShown) {
      this.popover.hide()
    }
  }

  @HostListener('document:mouseover')
  public handleMouseOver(): void {
    if (this.popover?.isShown) {
      setTimeout(() => {
        this.popover.hide()
      }, 2000)
    }
  }

  private checkAppVersion(): void {
    if (!this.swUpdate.isEnabled) {
      console.log('Not Enabled')
      return
    }

    this.swUpdate.checkForUpdate().then(() => {
      this.swUpdate.versionUpdates
        .pipe(
          filter(
            (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY',
          ),
          map(evt => ({
            type: 'UPDATE_AVAILABLE',
            current: evt.currentVersion,
            available: evt.latestVersion,
          })),
        )
        .subscribe(event => {
          this.openVersionAvailableDialog()
          console.debug(`current`, event.current, `available `, event.available)
        })
    })
  }

  private openVersionAvailableDialog(): void {
    const content = {
      body: 'Deseja instalar a atualização?',
      confirmText: 'Instalar',
      confirmIcon: 'fas fa-sync-alt text-white',
      confirmType: 'success',
      cancelText: 'Adiar',
    }

    const dialogRef = this.dialogService.open(ConfirmationComponent, {})

    dialogRef.componentRef.instance.dialogTitle = `Existe uma atualização para o sistema`
    dialogRef.componentRef.instance.confirmationContent = content

    dialogRef.onClose.subscribe((doUpdate: boolean) => {
      this.handleVersionUpdate(doUpdate)
    })
  }

  private handleVersionUpdate(doUpdate: boolean) {
    if (doUpdate) {
      this.toastr.send({
        type: 'success',
        message:
          'A atualização foi instalada com sucesso e será aplicada dentro dos próximos 3 segundos.',
      })
      setTimeout(() => {
        this.swUpdate.activateUpdate().then(() => location.reload())
      }, 3000)
    } else {
      this.toastr.send({
        type: 'warning',
        message: 'A atualização foi adiada.',
      })
      return
    }
  }

  private initializeFavoritesControl(): void {
    this.menuService
      .onItemHover()
      .pipe(debounceTime(2500), takeUntil(this.destroy$))
      .subscribe((data: { tag: string; item: NbMenuItem }) => {
        if (data.item.link) {
          this.actualMenuData = data.item
          if (data.item?.parent?.parent) {
            this.actualMenuData.completeTitle =
              data.item.parent.parent.title +
              ' | ' +
              data.item.parent.title +
              ' | ' +
              data.item.title
          } else if (data.item?.parent) {
            this.actualMenuData.completeTitle =
              data.item.parent.title + ' | ' + data.item.title
          } else this.actualMenuData.completeTitle = data.item.title

          const favorites: any[] = JSON.parse(localStorage.getItem('favorites'))

          let favorite: any
          if (favorites) {
            favorite = favorites.find(i => {
              return i.completeTitle === this.actualMenuData.completeTitle
            })

            if (favorite) {
              this.actualIsFavorite = true
            } else this.actualIsFavorite = false
          } else this.actualIsFavorite = false

          this.popover.show()
        }
      })
  }

  private collapseSideBar(): void {
    setTimeout(() => {
      this.sidebarService.toggle(true, 'menu-sidebar')
      this.layoutService.changeLayoutSize()
    }, 50)
  }

  public addClick(): void {
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites'))
    let favorite: any
    if (favorites) {
      favorite = favorites.find(i => {
        return i.completeTitle === this.actualMenuData.completeTitle
      })
      if (!favorite) {
        const item = {
          completeTitle: this.actualMenuData.completeTitle,
          title: this.actualMenuData.title,
          icon: this.actualMenuData.icon,
          link: this.actualMenuData.link,
        }
        favorites.push(item)
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    } else {
      const temp: any[] = []
      const item = {
        completeTitle: this.actualMenuData.completeTitle,
        title: this.actualMenuData.title,
        icon: this.actualMenuData.icon,
        link: this.actualMenuData.link,
      }
      temp.push(item)
      localStorage.setItem('favorites', JSON.stringify(temp))
    }
  }

  public removeClick(): void {
    const favorites: any[] = JSON.parse(localStorage.getItem('favorites'))

    const item = favorites.find(favorite => {
      return favorite.completeTitle === this.actualMenuData.completeTitle
    })

    const index = favorites.findIndex(i => {
      return i.completeTitle === this.actualMenuData.completeTitle
    })

    if (item) {
      favorites.splice(index, 1)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }
}
