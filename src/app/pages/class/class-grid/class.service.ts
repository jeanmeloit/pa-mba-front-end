import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '@services/base/base.service'

import { Class } from '../interfaces/class.interface'

@Injectable({
  providedIn: 'root',
})
export class ClassService extends BaseService<Class[], Class> {
  constructor(http: HttpClient) {
    super(http, 'class')
  }
}
