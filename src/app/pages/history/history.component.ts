import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core'
import {Component, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource} from '@angular/material/table'
import {registerLocaleData} from '@angular/common'
import {MatDialog} from '@angular/material/dialog'
import {MatSort} from '@angular/material/sort'
import ru from '@angular/common/locales/ru'
import * as moment from 'moment'

import {ModalConsumptionComponent} from '../../shared/modal-consumption/modal-consumption.component'
import {ModalIncomeComponent, MY_FORMATS} from '../../shared/modal-income/modal-income.component'
import {BuhgalteryService} from '../../shared/buhgaltery.service'
import {IHistory, Priznak} from '../../shared/interfaces'
import {FormControl} from '@angular/forms'

registerLocaleData(ru, 'ru')

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class HistoryComponent implements OnInit {
  isShowFilter: boolean = false
  matStartDate = new FormControl(moment().startOf('month'))
  matEndDate = new FormControl(moment().endOf('month'))
  historyData: IHistory[] = []
  displayedColumns: string[] = [
    'name',
    'date',
    'priznak',
    'category1',
    'category2',
    'category3',
    'category4',
    'price',
    'qntyOrWeightNum',
    'summa',
  ]
  isLoading: boolean = false

  // @ts-ignore
  dataSource: MatTableDataSource<IHistory>

  @ViewChild(MatSort) sort: MatSort = new MatSort()
  matInputValue: string = ''
  myInput: string = ''

  constructor(
    private service: BuhgalteryService,
    private dialog: MatDialog,
    private _adapter: DateAdapter<any>,
  ) {
  }

  ngOnInit(): void {
    this._adapter.setLocale('ru')
    this.isLoading = true
    this.updateTable()
  }

  private updateTable(term?: string) {
    this.isLoading = true
    this.service.getAllHistory().subscribe((data) => {
      if (data) {
        this.historyData = data.map((res: { payload: { doc: { id: string; data: () => IHistory[]; }; }; }) => {
          return <IHistory[]>{
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
        this.historyData = this.historyData
          .sort((a, b) => {
            // @ts-ignore
            return new Date(Object(b.date).seconds * 1000) - new Date(Object(a.date).seconds * 1000)
          })
        // @ts-ignore
        if (term?.trim().length > 0) {
          // @ts-ignore
          this.historyData = this.historyData.filter(el => el.name.toLowerCase().includes(term?.trim().toLowerCase()))
        }
        this.dataSource = new MatTableDataSource<IHistory>(this.historyData)
        this.dataSource.sort = this.sort
        this.isLoading = false
      }
    })

  }

  editRow(row: IHistory) {
    let dialogRef: any
    if (!row.qntyOrWeight) {
      dialogRef = this.dialog.open(ModalIncomeComponent, {
        data: [Priznak.income, row, true],
        maxWidth: '480px',
        minWidth: '320px',
      })
    } else {
      dialogRef = this.dialog.open(ModalConsumptionComponent, {
        data: [Priznak.rashod, row, true],
        maxWidth: '480px',
        minWidth: '320px',
      })
    }
    dialogRef.afterClosed().subscribe((result: IHistory) => {
      if (result) {
        this.service.updateHistory(result)
        this.updateTable()
      } else {
        this.updateTable()
      }
    })
  }

  onSelectDate(): void {
    if (this.matStartDate.value && this.matEndDate.value) {
      this._updateData(
        this.matStartDate.value,
        this.matEndDate.value,
      )
    }
  }

  private _updateData(startDate?: Date, endDate?: Date): void {
    this.service.getAllHistory().subscribe((data) => {
      if (data) {
        this.historyData = data.map((res: { payload: { doc: { id: string; data: () => IHistory[]; }; }; }) => {
          return <IHistory[]>{
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
        if (startDate && endDate) {
          this.historyData = this.historyData?.filter(h => moment(Object(h.date).seconds * 1000)
            .isBetween(
              moment(startDate),
              moment(endDate)
                .hour(23)
                .minute(59)
                .second(59)
                .millisecond(999),
            ) ? h : null)
          this.dataSource = new MatTableDataSource<IHistory>(this.historyData)
        }
      }
    })
  }

  onChangeInput(term: string): void {
    this.myInput = term
    this.dataSource = new MatTableDataSource<IHistory>(this._filter(term))
  }

  private _filter(value: string): IHistory[] {
    const arr1: IHistory[] = this.historyData.filter(el => el.name.toLowerCase().includes(value.trim().toLowerCase()))
    const arr2: IHistory[] = this.historyData.filter(el => el.category.category1.toLowerCase().includes(value.trim().toLowerCase()))
    const arr3: IHistory[] = this.historyData.filter(el => el.category.category2?.toLowerCase().includes(value.trim().toLowerCase()))
    const arr4: IHistory[] = this.historyData.filter(el => el.category.category3?.toLowerCase().includes(value.trim().toLowerCase()))
    const arr5: IHistory[] = this.historyData.filter(el => el.category.category4?.toLowerCase().includes(value.trim().toLowerCase()))

    const arrArrays: [IHistory[], IHistory[], IHistory[], IHistory[], IHistory[]] = [arr1, arr2, arr3, arr4, arr5]
    let longestArr: IHistory[] = arrArrays[0]
    let longest: number = 0

    arrArrays.forEach(arr => {
      if (arr.length > longest) {
        longestArr = arr
        longest = arr.length
      }
    })

    return longestArr
  }

}
