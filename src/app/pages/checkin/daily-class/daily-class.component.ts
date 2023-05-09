import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import { ClassService } from '@pages/class/class-grid/class.service'
import { Class } from '@pages/class/interfaces/class.interface'
import { finalize, firstValueFrom, Subscription } from 'rxjs'

import { CheckinService } from '../services/checkin.service'

@Component({
  selector: 'pds-daily-class',
  templateUrl: './daily-class.component.html',
  styleUrls: ['./daily-class.component.scss'],
})
export class DailyClassComponent implements OnInit, OnDestroy {
  public loading = false
  public pageTitle: string
  public class: Class
  public checkins: any[] = []

  private classUuid: string
  private personUuid: string
  private date: string

  private subscription: Subscription

  constructor(
    private service: CheckinService,
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  public async ngOnInit(): Promise<void> {
    const { date, classUuid } = await firstValueFrom(this.route.params)

    this.classUuid = classUuid
    this.personUuid = JSON.parse(localStorage.getItem('userData')).personUuid
    this.date = date
    this.getClass()
    this.getCheckins()
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  private getClass(): void {
    this.subscription = this.classService
      .getIndividual(this.classUuid)
      .subscribe({
        next: (data: any) => {
          const tempDate = new Date(this.date)
          tempDate.setUTCHours(tempDate.getUTCHours() + 3)
          this.pageTitle = `${data.name}: ${
            tempDate.toLocaleString().split(',')[0]
          }`
          this.class = data
        },
        error: () => null,
      })
  }

  private getCheckins(): void {
    this.loading = true
    this.subscription = this.service
      .get({ classUuid: this.classUuid, date: this.date })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data: any) => {
          this.checkins = data
        },
        error: () => null,
      })
  }

  public checkin(): void {
    const dto = {
      classUuid: this.classUuid,
      date: this.date,
      personUuid: this.personUuid.split('/')[1],
    }

    this.subscription = this.service.post(dto).subscribe({
      next: () => {
        this.toastr.send({
          type: 'success',
          message: 'Checkin realizado com sucesso!',
        })
      },
    })
  }

  public cancelCheckin(): void {}

  public back(): void {
    this.router.navigate(['checkin'])
  }
}
