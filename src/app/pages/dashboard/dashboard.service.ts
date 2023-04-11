import { Injectable } from '@angular/core'
import {
  collection,
  collectionData,
  Firestore,
  Timestamp,
} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private resource = collection(this.firestore, 'users')
  constructor(private firestore: Firestore) {}

  public get(): Observable<any[]> {
    return (collectionData(this.resource) as Observable<any[]>).pipe(
      map(resources =>
        resources.map(resource => {
          console.log(resource)
          return {
            nome: resource.name,
            email: resource.mail,
            telefone: resource.phone,
            atualizadoEm: (resource.updatedAt as Timestamp).toDate(),
          }
        }),
      ),
    )
  }
}
