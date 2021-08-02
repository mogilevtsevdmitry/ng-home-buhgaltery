import {Component, OnInit, ViewChild} from '@angular/core'
import {registerLocaleData} from '@angular/common'
import {MatTableDataSource} from '@angular/material/table'
import {MatDialog} from '@angular/material/dialog'
import {MatSort} from '@angular/material/sort'
import ru from '@angular/common/locales/ru'

import {ModalConsumptionComponent} from '../../shared/modal-consumption/modal-consumption.component'
import {ModalIncomeComponent} from '../../shared/modal-income/modal-income.component'
import {BuhgalteryService} from '../../shared/buhgaltery.service'
import {IHistory, Priznak} from '../../shared/interfaces'

registerLocaleData(ru, 'ru')

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
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

  constructor(private service: BuhgalteryService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateTable()
  }

  private updateTable() {
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
        this.dataSource = new MatTableDataSource<IHistory>(this.historyData)
        // this.dataSource.sort = this.sort
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

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   console.log(filterValue);

  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.updateTable();
  // }
}
