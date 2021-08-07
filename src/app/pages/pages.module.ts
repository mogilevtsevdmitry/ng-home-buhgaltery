import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatTableModule} from '@angular/material/table'
import {MatSortModule} from '@angular/material/sort'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import {PagesRoutingModule} from './pages-routing.module'
import {IndexComponent} from './index/index.component'
import {SharedModule} from '../shared/shared.module'
import {HistoryComponent} from './history/history.component'
import {CategoriesComponent} from './categories/categories.component'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [IndexComponent, HistoryComponent, CategoriesComponent],
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
  ],
})
export class PagesModule {
}
