import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'pds-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public pageTitle: string = 'Usuários'

  constructor() {}

  public ngOnInit(): void {}
}
