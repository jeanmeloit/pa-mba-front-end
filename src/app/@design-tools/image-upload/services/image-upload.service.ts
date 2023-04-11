import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData()

    formData.append('image', image)

    return this.http.post('/api/v1/image-upload', formData)
  }
}
