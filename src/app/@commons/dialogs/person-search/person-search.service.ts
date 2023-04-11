import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '@commons/services/base/base.service'

// TODO ADD PERSON INTERFACE AND RETURN INTERFACE

@Injectable({
  providedIn: 'root',
})
export class PersonSearchService extends BaseService<any, any> {
  constructor(private httpParameter: HttpClient) {
    super(httpParameter, 'pessoa')
  }
}
