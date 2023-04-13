import { Component, OnInit } from '@angular/core'
import { DefaultConfiguration } from '@src/configuration'

@Component({
  selector: 'pds-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public aboutTitle = DefaultConfiguration.app.aboutTitle
  public aboutDescription = DefaultConfiguration.app.aboutDescription

  constructor() {}

  ngOnInit(): void {}
}
