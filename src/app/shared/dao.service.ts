import {AngularFirestore} from '@angular/fire/firestore'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DaoService {
  constructor(
    private firebaseService: AngularFirestore,
  ) {
  }

  get(collection: string): Observable<any> {
    return this.firebaseService
      .collection(collection)
      .snapshotChanges()
  }

  async create(collection: string, el: any) {
    await this.firebaseService
      .collection(collection)
      .add(el)
  }

  async update(collection: string, el: any) {
    const category = this.firebaseService.collection(collection).doc(el.id)
    await category.update({...el})
  }

  remove(collection: string, id: any) {
    this.firebaseService
      .doc(collection + '/' + id)
      .delete()
      .then(_ => {
      })
      .catch(err => console.error(err))
  }
}
