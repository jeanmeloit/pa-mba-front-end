import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
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

  constructor(
    private service: ClassService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

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
      .subscribe({
        next: (data: Class[]) => {
          this.classes = data
        },
        error: (err: any) => {
          this.toastr.send({
            type: 'danger',
            message: err.error?.causa?.descricao || err?.error?.causa?.message,
          })
        },
      })
  }

  private fetchDates(): void {
    this.loading = true
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + 6)

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      this.dates.push(new Date(d))
      if (d === endDate) this.loading = false
    }
  }

  public dailyClassDetails(date: Date, classUuid: string): void {
    this.router.navigate([
      'checkin',
      this.getShortDate(date.toISOString()),
      classUuid,
    ])
  }

  private getShortDate(date: string): string {
    return date.split('T')[0]
  }
}
