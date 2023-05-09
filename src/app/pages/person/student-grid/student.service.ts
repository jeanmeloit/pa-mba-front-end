import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '@commons/services/base/base.service'
import { Student } from '@pages/person/interfaces/student.interface'

@Injectable({
  providedIn: 'root',
})
export class StudentService extends BaseService<Student[], Student> {
  constructor(http: HttpClient) {
    super(http, 'person')
  }
}
