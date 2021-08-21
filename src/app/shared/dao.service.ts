import {AngularFirestore} from '@angular/fire/firestore'
import {AngularFireAuth} from '@angular/fire/auth'
import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import {IUser} from './interfaces'

@Injectable({
  providedIn: 'root',
})
export class DaoService {

  isAuth: Subject<boolean> = new Subject<boolean>()

  constructor(
    private firebaseService: AngularFirestore,
    private authService: AngularFireAuth,
  ) {
  }

  isAuthenticated(): Observable<boolean> {
    this.authService.authState.subscribe(res => {
      this.isAuth.next(!!res)
    })
    return this.isAuth
  }

  /* Sign in */
  signIn({email, password}: IUser): Promise<any> {
    return this.authService
      .signInWithEmailAndPassword(email, password)
  }

  /* Sign out */
  signOut(): Promise<any> {
    return this.authService.signOut()
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
