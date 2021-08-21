import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {MatTableModule} from '@angular/material/table'
import {MatInputModule} from '@angular/material/input'
import {MatSortModule} from '@angular/material/sort'
import {MatIconModule} from '@angular/material/icon'
import {CommonModule} from '@angular/common'
import {ChartsModule} from 'ng2-charts'
import {NgModule} from '@angular/core'

import {CategoriesComponent} from './categories/categories.component'
import {HistoryComponent} from './history/history.component'
import {PagesRoutingModule} from './pages-routing.module'
import {IndexComponent} from './index/index.component'
import {SharedModule} from '../shared/shared.module'
import {LoginComponent} from './login/login.component'

@NgModule({
  declarations: [IndexComponent, HistoryComponent, CategoriesComponent, LoginComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ChartsModule,
  ],
})
export class PagesModule {
}
