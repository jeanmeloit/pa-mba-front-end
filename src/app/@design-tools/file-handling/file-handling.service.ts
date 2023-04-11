import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FileHandlingService {
  constructor(private http: HttpClient) {}

  public upload(
    url: string,
    files: Set<File>,
  ): { [key: string]: Observable<any> } {
    // this will be the our resulting map
    const status = {}
    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData()
      formData.append('anexo', file, file.name)
      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true,
        withCredentials: true,
      })

      // create a new progress-subject for every file
      const progress = new Subject<any>()

      // send the http-request and subscribe for progress-updates
      const subscription = this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total) - 1

          progress.next({ percent: percentDone, response: event })
        } else if (event instanceof HttpResponse) {
          progress.next({ percent: 100, response: event })
          progress.complete()

          subscription.unsubscribe()
          files.delete(file)
        }
      })

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable(),
      }
    })

    // return the map of progress.observables
    return status
  }
}
