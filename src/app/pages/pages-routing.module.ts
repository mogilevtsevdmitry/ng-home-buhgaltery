import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {IndexComponent} from './index/index.component'
import {CategoriesComponent} from './categories/categories.component'
import {HistoryComponent} from './history/history.component'

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'categories', component: CategoriesComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
