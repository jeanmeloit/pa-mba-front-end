import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { PreLoadInterface } from './pre-load'

@Injectable({
  providedIn: 'root',
})
export class PreLoadService {
  private _person: PreLoadInterface['dados']

  public get person(): PreLoadInterface['dados'] {
    return this._person
  }
  public set person(value: PreLoadInterface['dados']) {
    this._person = value
  }

  private _planning: PreLoadInterface['dados']

  public get planning(): PreLoadInterface['dados'] {
    return this._planning
  }
  public set planning(value: PreLoadInterface['dados']) {
    this._planning = value
  }

  constructor(private http: HttpClient) {}

  public doLoad(): void {
    let plStorage: any = JSON.parse(localStorage.getItem('pre_loading'))

    if (plStorage && plStorage.person) this.person = plStorage.person
    else {
      this.loadPerson().subscribe(
        (data: PreLoadInterface) => {
          this.person = data.dados
          plStorage = { ...plStorage, person: data.dados }
          localStorage.setItem('pre_loading', JSON.stringify(plStorage))
        },
        (err: any) => {},
      )
    }

    if (plStorage && plStorage.planning) this.planning = plStorage.planning
    else {
      this.loadPlanning().subscribe(
        (data: PreLoadInterface) => {
          this.planning = data.dados
          plStorage = { ...plStorage, planning: data.dados }
          localStorage.setItem('pre_loading', JSON.stringify(plStorage))
        },
        (err: any) => {},
      )
    }
  }

  private loadPerson(): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.get<any>('pessoa/pre_carregamento', {
      headers,
    })
  }

  private loadPlanning(): Observable<any> {
    const headers = new HttpHeaders()

    return this.http.get<any>('planejamento/pre_carregamento', {
      headers,
    })
  }
}
