import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NotificationsContainerService {
  constructor(private http: HttpClient) {}

  public get(): Observable<any> {
    const headers = new HttpHeaders()
    return this.http.get<any>(`aviso-lido/todos`, {
      headers,
    })
  }

  public post(data: any): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.post<any>(`aviso-lido`, data, {
      headers,
      observe: 'response',
    })
  }
}
