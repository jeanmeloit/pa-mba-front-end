import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { DefaultConfiguration } from '@src/configuration'

import { AnalyticsService } from './@core/utils/analytics.service'
import { SeoService } from './@core/utils/seo.service'

/**
 * @license
 * Copyright Panther DS. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
@Component({
  selector: 'pds-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews()
    this.seoService.trackCanonicalChanges()
    this.titleService.setTitle(DefaultConfiguration.app.title)
  }
}
