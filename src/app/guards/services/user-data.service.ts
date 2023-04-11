import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { UserDataInterface } from '@guards/services/user-data'
import { CrossStorageClient } from 'cross-storage'

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public storage: CrossStorageClient = new CrossStorageClient(
    `${environment.backoOfficeUrl}`,
  )
  public iframe = this.storage
  public promisse = this.storage.onConnect()
  private _userData: UserDataInterface

  public get userData(): UserDataInterface {
    return this._userData
  }
  public set userData(value: UserDataInterface) {
    this._userData = value
  }

  constructor() {}

  public crossClientGet(key: string): any {
    return this.promisse
      .then(() => this.iframe.get(key))
      .then((data: string) => {
        const userData = JSON.parse(data)
        this.userData = userData

        if (userData && userData !== undefined && userData !== null) {
          return true
        } else {
          const url = window.location.href
          let prefix: string = '/#/login'
          window.open(
            `${environment.backoOfficeUrl}${prefix}?wayBack=${encodeURI(url)}`,
            '_self',
          )
        }
      })
      .catch(() => {
        const url = window.location.href
        let prefix: string = '/#/login'
        window.open(
          `${environment.backoOfficeUrl}${prefix}?wayBack=${encodeURI(url)}`,
          '_self',
        )
      })
  }

  public crossClientSet(key: string): any {
    return this.promisse
      .then(() => this.iframe.set(key))
      .then((data: string) => {
        const userData = JSON.parse(data)
        this.userData = userData
        if (userData.token || userData !== undefined) {
          return true
        } else return false
      })
      .catch(() => {
        // do something
      })
  }

  public crossClientDel(key: string): any {
    return this.promisse
      .then(() => this.iframe.del(key))
      .then((data: string) => {
        const url = window.location.href
        let prefix: string = '/#/login'
        window.open(
          `${environment.backoOfficeUrl}${prefix}?wayBack=${encodeURI(url)}`,
          '_self',
        )
      })
      .catch(() => {
        // do something
      })
  }
}
