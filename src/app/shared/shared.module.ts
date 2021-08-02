import {RouterModule} from '@angular/router'
import {MatToolbarModule} from '@angular/material/toolbar'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LayoutModule} from '@angular/cdk/layout'
import {MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatSelectModule} from '@angular/material/select'
import {MatDialogModule} from '@angular/material/dialog'
import {MatNativeDateModule} from '@angular/material/core'
import {MatInputModule} from '@angular/material/input'
import {MatRadioModule} from '@angular/material/radio'

import {NavbarComponent} from './navbar/navbar.component'
import {AnaliticCardComponent} from './analitic-card/analitic-card.component'
import {ModalIncomeComponent} from './modal-income/modal-income.component'
import {ModalConsumptionComponent} from './modal-consumption/modal-consumption.component'
import {ModalAddCategoryComponent} from './modal-add-category/modal-add-category.component'
import {UniquePipe} from './pipes/unique.pipe'
import {TotalByRowPipe} from './pipes/total-by-row.pipe'
import {TotalCostPipe} from './pipes/total-cost.pipe'
import {DaoService} from './dao.service'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {SecondsToDatePipe} from './pipes/seconds-to-date.pipe'

@NgModule({
  declarations: [
    NavbarComponent,
    AnaliticCardComponent,
    ModalIncomeComponent,
    ModalConsumptionComponent,
    ModalAddCategoryComponent,
    UniquePipe,
    TotalByRowPipe,
    TotalCostPipe,
    SecondsToDatePipe,
  ],
    imports: [
        CommonModule,
        RouterModule,
        LayoutModule,
        FormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
      MatSortModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatDatepickerModule,
      MatDialogModule,
      MatNativeDateModule,
      MatInputModule,
      MatRadioModule,
      MatProgressSpinnerModule,
      MatAutocompleteModule,
    ],
  exports: [
    NavbarComponent,
    AnaliticCardComponent,
    ModalIncomeComponent,
    ModalConsumptionComponent,
    UniquePipe,
    TotalByRowPipe,
    TotalCostPipe,
    SecondsToDatePipe,
  ],
  providers: [DaoService],
})
export class SharedModule {
}
