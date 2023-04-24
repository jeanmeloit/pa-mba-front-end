import { Component, Input } from '@angular/core'

@Component({
  selector: 'pds-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() public id?: string

  constructor() {}
}
