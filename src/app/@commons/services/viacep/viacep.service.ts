import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { ViaCepResponseInterface } from './viacep'

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  constructor(private http: HttpClient) {}

  public get(cep: string): Observable<ViaCepResponseInterface> {
    const headers = new HttpHeaders()

    return this.http.get<ViaCepResponseInterface>(`viacep/${cep}`, {
      headers,
    })
  }
}
