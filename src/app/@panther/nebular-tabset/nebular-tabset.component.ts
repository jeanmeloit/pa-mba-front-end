import { Component, Input, OnInit } from '@angular/core'
import { NebularTab } from '@panther/interfaces/nebular-tab'

@Component({
  selector: 'pds-nebular-tabset',
  templateUrl: './nebular-tabset.component.html',
  styleUrls: ['./nebular-tabset.component.scss'],
})
export class NebularTabsetComponent implements OnInit {
  @Input() public templates: any

  @Input() public tabs: NebularTab[]

  constructor() {}

  ngOnInit(): void {}
}
