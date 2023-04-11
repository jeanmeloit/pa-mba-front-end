import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SystemContainerService {
  constructor(private http: HttpClient) {}

  // Change the dataInterface by your Interface or any
  public get(): Observable<any> {
    const headers = new HttpHeaders()
    return this.http.get<any>(`modulo`, {
      headers,
    })
  }
}
