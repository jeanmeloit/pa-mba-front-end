import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BaseService<RT, T> {
  constructor(protected http: HttpClient, private routeUrl: string) {}

  public get(filters?: any): Observable<RT> {
    const headers = new HttpHeaders()
    let params = new HttpParams()

    if (filters) {
      Object.keys(filters).forEach(p => (params = params.append(p, filters[p])))
    }

    return this.http.get<RT>(this.routeUrl, {
      headers,
      params,
    })
  }

  public getIndividual(
    uuid: string,
  ): Observable<{ dados: T; sucesso: boolean }> {
    const headers = new HttpHeaders()

    return this.http.get<{ dados: T; sucesso: boolean }>(
      `${this.routeUrl}/${uuid}`,
      {
        headers,
      },
    )
  }

  public put(dto: any): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.put<T>(`${this.routeUrl}/${dto.uuid}`, dto, {
      headers,
      observe: 'response',
    })
  }

  public post(dto: any): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.post<T>(this.routeUrl, dto, {
      headers,
      observe: 'response',
    })
  }

  public postBatch(batch: any[]): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.post<T[]>(`${this.routeUrl}/lote`, batch, {
      headers,
      observe: 'response',
    })
  }

  public delete(uuid: number): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.delete<any>(`${this.routeUrl}/${uuid}`, {
      headers,
    })
  }
}
