import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '@commons/services/base/base.service'

@Injectable({
  providedIn: 'root',
})
export class CheckinService extends BaseService<any[], any> {
  constructor(http: HttpClient) {
    super(http, 'checkin')
  }
}
