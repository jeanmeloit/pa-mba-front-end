import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject: Subject<boolean> = new Subject()

  constructor() { }

  public getLoadingSubject(): Subject<boolean> {
    return this.loadingSubject
  }
}
