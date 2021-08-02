import {MatTableDataSource} from '@angular/material/table'
import {Component, OnInit, ViewChild} from '@angular/core'
import {MatSort} from '@angular/material/sort'
import {MatDialog} from '@angular/material/dialog'

import {BuhgalteryService} from '../../shared/buhgaltery.service'
import {ICategory, Priznak} from '../../shared/interfaces'
import {ModalAddCategoryComponent} from '../../shared/modal-add-category/modal-add-category.component'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  private categoryData: ICategory[] = []
  displayedColumns: string[] = [
    'priznak',
    'category1',
    'category2',
    'category3',
    'category4',
  ]
  dohod = Priznak.income
  rashod = Priznak.rashod
  isLoading: boolean = false

  // @ts-ignore
  dataSource: MatTableDataSource<ICategory>

  @ViewChild(MatSort) sort: MatSort = new MatSort()

  constructor(
    private service: BuhgalteryService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.updateTable()
    this.dohod = Priznak.income
    this.rashod = Priznak.rashod
  }

  private updateTable() {
    this.service.getAllCategories().subscribe((data) => {
      if (data) {
        this.categoryData = data.map((res: { payload: { doc: { id: string; data: () => ICategory[]; }; }; }) => {
          return <ICategory[]>{
            id: res.payload.doc.id,
            ...res.payload.doc.data(),
          }
        })
        this.dataSource = new MatTableDataSource<ICategory>(this.categoryData)
        this.dataSource.sort = this.sort
        this.isLoading = false
      }
    })
  }

  editRow(row: ICategory) {
    let dialogRef: any
    dialogRef = this.dialog.open(ModalAddCategoryComponent, {
      data: [row.priznak, row, true],
      maxWidth: '480px',
      minWidth: '320px',
    })

    dialogRef.afterClosed().subscribe((result: ICategory) => {
      if (result) {
        this.service
          .updateCategory(result)
        // .subscribe((res) => (this.categoryData = res));
        this.updateTable()
      } else {
        this.updateTable()
      }
    })
  }

  addCategory(priznak: Priznak.rashod | Priznak.income) {
    const dialogRef = this.dialog.open(ModalAddCategoryComponent, {
      data: [priznak, null, false],
      maxWidth: '480px',
      minWidth: '320px',
    })

    dialogRef.afterClosed().subscribe((result: ICategory) => {
      if (result) {
        delete result.id
        this.service.addCategory(result)
        this.updateTable()
      }
    })
  }
}
