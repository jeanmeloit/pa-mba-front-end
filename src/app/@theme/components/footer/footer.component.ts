import { Component, OnDestroy, OnInit } from '@angular/core'
import { NbThemeService } from '@nebular/theme'
import { DefaultConfiguration } from '@src/configuration'
import { Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'pds-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <a href="#" class="mr-2">
        <img
          class="img-logo"
          [src]="
            currentTheme === 'dark' ||
            currentTheme === 'cosmic' ||
            currentTheme === 'material-light' ||
            currentTheme === 'material-dark'
              ? 'assets/img/white-logo.png'
              : 'assets/img/default-logo.png'
          "
        />
      </a>
      <b>
        <a href="#" target="_blank" [ngStyle]="{ 'text-decoration': 'none' }">{{
          config?.footer?.title
        }}</a>
      </b>
      {{ year }}
    </span>
    <div class="socials">
      <a
        *ngIf="config?.footer?.showLinkedin"
        href="{{ config?.footer?.linkedinLink }}"
        target="_blank"
        class="ion ion-social-linkedin"
      ></a>
      <a
        *ngIf="config?.footer?.showInstagram"
        href="{{ config?.footer?.instagramLink }}"
        target="_blank"
        class="ion ion-social-instagram"
      ></a>
      <a
        *ngIf="config?.footer?.showFacebook"
        href="{{ config?.footer?.facebookLink }}"
        target="_blank"
        class="ion ion-social-facebook"
      ></a>
      <a
        *ngIf="config?.footer?.showTwitter"
        href="{{ config?.footer?.twitterLink }}"
        target="_blank"
        class="ion ion-social-twitter"
      ></a>
    </div>
  `,
})
export class FooterComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>()

  public currentTheme = 'default'

  public config: typeof DefaultConfiguration

  public year: number = new Date().getFullYear()

  public constructor(private themeService: NbThemeService) {}

  public ngOnInit(): void {
    this.config = DefaultConfiguration

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
