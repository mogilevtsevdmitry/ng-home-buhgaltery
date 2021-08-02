import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import * as moment from 'moment'

import {IHistory} from '../../shared/interfaces'
import {BuhgalteryService} from '../../shared/buhgaltery.service'
import {ModalIncomeComponent} from '../../shared/modal-income/modal-income.component'
import {ModalConsumptionComponent} from '../../shared/modal-consumption/modal-consumption.component'
import {Priznak} from 'src/app/shared/interfaces'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  titleAddCategory: string = ''
  isLoading: boolean = false
  private historyData: IHistory[] | undefined
  incomeValue: number = 0
  consumptionValue: number = 0
  monthName: string = moment(new Date(), 'MM.YYYY').locale('ru').format('MMMM')
  private startOfMonth = moment().startOf('month')
  private endOfMonth = moment().endOf('month')

  constructor(private dialog: MatDialog, private service: BuhgalteryService) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.service.getAllHistory().subscribe((data) => {
      if (data) {
        this.historyData = data.map((res: { payload: { doc: { id: string; data: () => IHistory[]; }; }; }) => {
          return <IHistory[]>{
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
        this.isLoading = false
        this.incomeValue = this.historyData ? this.historyData.filter(h => !h.qntyOrWeightNum)
          .map(hh => Number(hh.price))
          .reduce((a, b) => Number(a) + Number(b), 0) : 0
        this.consumptionValue = this.historyData ? this.historyData.filter(h => h.qntyOrWeightNum)
          .filter(d => {
            return moment(Object(d.date).seconds * 1000).isBetween(this.startOfMonth, this.endOfMonth) ? d.date : null
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
      }
    })
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
}
