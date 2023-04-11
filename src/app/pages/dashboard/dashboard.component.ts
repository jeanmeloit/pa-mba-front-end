import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'pds-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users$: Observable<any[]>
  public loading: boolean = false
  constructor() {}

  public ngOnInit(): void {
    // this.fetchData()
  }

  // public fetchData(): void {
  //   this.loading = true
  //   this.users$ = this.service.get().pipe(tap(() => (this.loading = false)))
  // }
}
