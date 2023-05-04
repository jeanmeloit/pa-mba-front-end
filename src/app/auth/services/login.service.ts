import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { LoginInterface } from '../interfaces/login.interface'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>
  public currentUser: Observable<any>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('squirrel')),
    )

    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  public login(payload: LoginInterface): Observable<any> {
    const headers = new HttpHeaders()

    return this.http
      .post<any>('auth/login', payload, {
        headers,
        observe: 'response',
      })
      .pipe(
        map((user: any) => {
          if (user) {
            const data = user.body.data
            localStorage.setItem('squirrel', JSON.stringify(data.token))
            this.currentUserSubject.next(data.token)
            this.sanitizeUserData(data)
          }

          return user
        }),
      )
  }

  private sanitizeUserData(data: any): void {
    delete data.password
    delete data.token
    localStorage.setItem('userData', JSON.stringify(data))
  }

  public logout(): void {
    localStorage.removeItem('squirrel')
    localStorage.removeItem('userData')
    this.currentUserSubject.next(null)
  }
}
