import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {ICategory, IHistory} from './interfaces'
import {environment} from '../../environments/environment'
import {DaoService} from './dao.service'


@Injectable({
  providedIn: 'root',
})
export class BuhgalteryService {

  constructor(private dao: DaoService) {
  }


  getAllHistory(): Observable<any> {
    return this.dao
      .get(environment.firestoreCollections.history)
  }

  addHistory(history: IHistory): void {
    this.dao
      .create(environment.firestoreCollections.history, history)
      .then()
      .catch(err => console.error(err))
  }

  updateHistory(history: IHistory): void {
    this.dao
      .update(environment.firestoreCollections.history, history)
      .then()
      .catch(err => console.error(err))
  }

  deleteHistoryRow(id: any): void {
    this.dao
      .remove(environment.firestoreCollections.history, id)
  }


  getAllCategories(): Observable<any> {
    return this.dao
      .get(environment.firestoreCollections.categories)
  }

  addCategory(category: ICategory): void {
    this.dao
      .create(environment.firestoreCollections.categories, category)
      .then()
      .catch(err => console.error(err))
  }

  updateCategory(categoryRow: ICategory): void {
    this.dao
      .update(environment.firestoreCollections.categories, categoryRow)
      .then()
      .catch(err => console.error(err))
  }

  deleteCategoryRow(id: any): void {
    this.dao
      .remove(environment.firestoreCollections.categories, id)
  }
}
