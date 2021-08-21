import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatNativeDateModule} from '@angular/material/core'
import {MatButtonModule} from '@angular/material/button'
import {MatSelectModule} from '@angular/material/select'
import {MatDialogModule} from '@angular/material/dialog'
import {MatTableModule} from '@angular/material/table'
import {MatInputModule} from '@angular/material/input'
import {MatRadioModule} from '@angular/material/radio'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatSortModule} from '@angular/material/sort'
import {LayoutModule} from '@angular/cdk/layout'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'
import {ChartsModule} from 'ng2-charts'
import {NgModule} from '@angular/core'

import {ModalAddCategoryComponent} from './modal-add-category/modal-add-category.component'
import {ModalConsumptionComponent} from './modal-consumption/modal-consumption.component'
import {AnaliticCardComponent} from './analitic-card/analitic-card.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {ModalIncomeComponent} from './modal-income/modal-income.component'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {PieChartComponent} from './pie-chart/pie-chart.component'
import {SecondsToDatePipe} from './pipes/seconds-to-date.pipe'
import {NavbarComponent} from './navbar/navbar.component'
import {TotalByRowPipe} from './pipes/total-by-row.pipe'
import {TotalCostPipe} from './pipes/total-cost.pipe'
import {UniquePipe} from './pipes/unique.pipe'
import {DaoService} from './dao.service'
import {FormLoginComponent} from './form-login/form-login.component'
import {MatCardModule} from '@angular/material/card'

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
    PieChartComponent,
    FormLoginComponent,
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
    ChartsModule,
    MatCardModule,
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
    PieChartComponent,
    FormLoginComponent,
  ],
  providers: [DaoService],
})
export class SharedModule {
}
