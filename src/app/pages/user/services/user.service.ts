import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '@commons/services/base/base.service'

import { User } from '../../../auth/interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User[], User> {
  constructor(http: HttpClient) {
    super(http, 'user')
  }
}
