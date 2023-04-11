import {
  ApplicationRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { ConfirmationComponent } from '@dialogs/confirmation/confirmation.component'
import {
  NbDialogService,
  NbMenuItem,
  NbMenuService,
  NbPopoverDirective,
  NbSidebarService,
} from '@nebular/theme'
import { PreLoadService } from '@pages/pre-load.service'
import { ToastrService } from '@services/toastr/toastr.service'
import { Subject } from 'rxjs'
import { debounceTime, takeUntil } from 'rxjs/operators'

import { LayoutService } from '../@core/utils'
import { MENU_ITEMS } from './menu'

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
  menu = MENU_ITEMS

  private readonly destroy$ = new Subject<void>()

  public actualMenuData: any
  public actualIsFavorite: boolean = false

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private preLoadService: PreLoadService,
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private dialogService: NbDialogService,
    private toastr: ToastrService,
  ) {
    this.updateClient()
  }

  public ngOnInit(): void {
    this.initializeFavoritesControl()
    this.preLoadData()
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

  private updateClient(): void {
    if (!this.swUpdate.isEnabled) {
      console.log('Not Enabled')
      return
    }
    // this.swUpdate.versionUpdates.pipe(
    //   filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    //   map(evt => ({
    //     type: 'UPDATE_AVAILABLE',
    //     current: evt.currentVersion,
    //     available: evt.latestVersion,
    //   })),
    // )
    this.swUpdate.available.subscribe(event => {
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

      dialogRef.onClose.subscribe((data: boolean) => {
        if (data) {
          this.toastr.send({
            success: true,
            message:
              'A atualização foi instalada com sucesso e será aplicada dentro dos próximos 3 segundos.',
          })
          setTimeout(() => {
            this.swUpdate.activateUpdate().then(() => location.reload())
          }, 3000)
        } else {
          this.toastr.send({
            warning: true,
            message: 'A atualização foi adiada.',
          })
          return
        }
      })
      console.log(`current`, event.current, `available `, event.available)
    })

    this.swUpdate.activated.subscribe(event => {
      console.log(`current`, event.previous, `available `, event.current)
    })
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

  private preLoadData(): void {
    this.preLoadService.doLoad()
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