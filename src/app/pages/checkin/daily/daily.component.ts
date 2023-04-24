import { Component, OnDestroy, OnInit } from '@angular/core'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import { ClassService } from '@pages/class/class-grid/class.service'
import { Class } from 'leaflet'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'pds-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent implements OnInit, OnDestroy {
  public loading: boolean = false
  public classes: Class[] = []
  public dates: Date[] = []

  private subscription: Subscription

  constructor(private service: ClassService, private toastr: ToastrService) {}

  public ngOnInit(): void {
    this.fetchClasses()
    this.fetchDates()
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  private fetchClasses(): void {
    this.loading = true
    this.subscription = this.service
      .get()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Class[]) => {
          this.classes = data
        },
        (err: any) => {
          this.toastr.send({
            type: 'danger',
            message: err.error?.causa?.descricao || err?.error?.causa?.message,
          })
        },
      )
  }

  private fetchDates(): void {
    this.loading = true
    const startDate = new Date()
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 1)

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      this.dates.push(new Date(d))
      if (d === endDate) this.loading = false
    }
  }
}
