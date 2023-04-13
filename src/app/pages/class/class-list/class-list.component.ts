import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'pds-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent implements OnInit {
  public pageTitle: string = 'Turma'

  constructor() {}

  ngOnInit(): void {}
}
