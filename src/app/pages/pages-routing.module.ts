import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {IndexComponent} from './index/index.component'
import {CategoriesComponent} from './categories/categories.component'
import {HistoryComponent} from './history/history.component'
import {LoginComponent} from './login/login.component'
import {AuthGuard} from '../shared/auth.guard'

const routes: Routes = [
  {path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'index'},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
