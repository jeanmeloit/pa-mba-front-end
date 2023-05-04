import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import localePt from '@angular/common/locales/pt'
import { enableProdMode, LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { ApmModule } from '@elastic/apm-rum-angular'
import { APIInterceptor } from '@misc/api.interceptor'
import { BlobErrorHttpInterceptor } from '@misc/blob-error-http-interceptor'
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme'
import { loadMessages, locale } from 'devextreme/localization'

import portugueseMessages from '../assets/devextreme-localization/pt.json'
import { environment } from '../environments/environment'
import { CoreModule } from './@core/core.module'
import { ThemeModule } from './@theme/theme.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'

/**
 * @license
 * Copyright Panther DS. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
registerLocaleData(localePt)

// tslint:disable:max-line-length
if (environment.production) {
  enableProdMode()
}

loadMessages(portugueseMessages)
locale(navigator.language)

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApmModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 15 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:15000',
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BlobErrorHttpInterceptor,
      multi: true,
    },
    APIInterceptor,
    BlobErrorHttpInterceptor,
    Title,
  ],
})
export class AppModule {}
