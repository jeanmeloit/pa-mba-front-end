import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'pds-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  public pageTitle: string = 'Alunos'

  constructor() {}

  public ngOnInit(): void {}
}
