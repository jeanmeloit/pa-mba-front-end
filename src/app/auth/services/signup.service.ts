import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '../interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  public signup(user: User): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.post<User>('auth/signup', user, {
      headers,
      observe: 'response',
    })
  }
}
