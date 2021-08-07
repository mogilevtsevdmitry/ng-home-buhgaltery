import {MatDialog} from '@angular/material/dialog'
import {Component, OnInit} from '@angular/core'
import * as moment from 'moment'

import {ModalConsumptionComponent} from '../../shared/modal-consumption/modal-consumption.component'
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter'
import {ModalIncomeComponent, MY_FORMATS} from '../../shared/modal-income/modal-income.component'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core'
import {BuhgalteryService} from '../../shared/buhgaltery.service'
import {Priznak} from 'src/app/shared/interfaces'
import {IHistory} from '../../shared/interfaces'
import {FormControl} from '@angular/forms'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class IndexComponent implements OnInit {

  private historyData: IHistory[] | undefined
  titleAddCategory: string = ''
  isLoading: boolean = false
  incomeValue: number = 0
  consumptionValue: number = 0
  monthName: string = moment(new Date(), 'MM.YYYY').locale('ru').format('MMMM')
  private startOfMonth = moment().startOf('month')
  private endOfMonth = moment().endOf('month')
  isShowFilter: boolean = false
  matStartDate = new FormControl(moment().startOf('month'))
  matEndDate = new FormControl(moment().endOf('month'))

  constructor(
    private dialog: MatDialog,
    private service: BuhgalteryService,
    private _adapter: DateAdapter<any>,
  ) {
  }

  ngOnInit(): void {
    this._adapter.setLocale('ru')
    this.isLoading = true
    this._updateData()
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
        }
      }
      this._updateAnalyticCards(this.historyData)
    })
  }

  private _updateAnalyticCards(data: IHistory[] | undefined): void {
    this.incomeValue = data ? data.filter(h => !h.qntyOrWeightNum)
      .map(hh => Number(hh.price))
      .reduce((a, b) => Number(a) + Number(b), 0) : 0
    this.consumptionValue = data ? data.filter(h => h.qntyOrWeightNum)
      .filter(d => {
        return moment(Object(d.date).seconds * 1000).isBetween(this.startOfMonth, this.endOfMonth) ? d : null
      })
      .map(hh => {
          return (
            hh.qntyOrWeight === 'qnty'
              ? Number(hh.qntyOrWeightNum) * Number(hh.price)
              : Number(hh.qntyOrWeightNum) / 1000 * Number(hh.price)
          )
        },
      )
      .reduce((a, b) => a + b, 0) : 0
    this.isLoading = false
  }

  onIncome(): void {
    this.titleAddCategory = Priznak.income
    const dialogRef = this.dialog.open(ModalIncomeComponent, {
      data: [Priznak.income],
      maxWidth: '480px',
      minWidth: '320px',
    })

    dialogRef.afterClosed().subscribe((result: IHistory) => {
      if (result) {
        delete result.id
        this.service.addHistory(result)
      }
    })
  }

  onConsumption(): void {
    this.titleAddCategory = Priznak.rashod
    const dialogRef = this.dialog.open(ModalConsumptionComponent, {
      data: [Priznak.rashod],
      maxWidth: '480px',
      minWidth: '320px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        delete result.id
        this.service.addHistory(result)
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
}
