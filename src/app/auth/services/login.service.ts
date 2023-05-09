import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { LoginInterface } from '../interfaces/login.interface'
import { User } from '../interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentJwtSubject: BehaviorSubject<any>
  private currentUserSubject: BehaviorSubject<User>
  public currentJwt: Observable<any>
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentJwtSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('squirrel')),
    )
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('userData')),
    )

    this.currentJwt = this.currentJwtSubject.asObservable()
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentJwtValue(): any {
    return this.currentJwtSubject.value
  }

  public get currentUserValue(): User {
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
            this.currentJwtSubject.next(data.token)
            this.currentUserSubject.next(data)
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
    this.currentJwtSubject.next(null)
    this.currentUserSubject.next(null)
  }
}
