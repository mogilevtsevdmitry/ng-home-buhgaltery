import {Component, Inject, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core'
import {Observable} from 'rxjs'
import {map, startWith} from 'rxjs/operators'

import {ICategory, IHistory, Priznak, QntyOrWeight} from '../interfaces'
import {ModalAddCategoryComponent} from '../modal-add-category/modal-add-category.component'
import {BuhgalteryService} from '../buhgaltery.service'
import {users} from '../data'
import {unique} from '../Util'


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-modal-consumption',
  templateUrl: './modal-consumption.component.html',
  styleUrls: ['./modal-consumption.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ModalConsumptionComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  title: string = ''
  categories$: Observable<ICategory[]> | undefined
  qntyOrWeightRadioBtns: QntyOrWeight = QntyOrWeight.qnty
  showOrHideDescription: boolean = false
  isDel: boolean = false
  names: Observable<string[]> | undefined
  private namesArr: string[] = []
  private historyData: IHistory[] = []

  constructor(
    private _adapter: DateAdapter<any>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalConsumptionComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDialog: [string, IHistory, boolean],
    private service: BuhgalteryService,
  ) {
  }

  ngOnInit(): void {
    this._getNames()
    this._adapter.setLocale('ru')
    this.isDel = this.dataDialog[2] ? this.dataDialog[2] : false
    this.qntyOrWeightRadioBtns = this.dataDialog[1]?.qntyOrWeight || QntyOrWeight.qnty
    this._setForm(this.dataDialog[1])
    this.names = this.form.controls['name'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      )
    this.title = this.dataDialog[0]
    this.getCategories()
  }

  private _setForm(h?: IHistory) {
    this.form = new FormGroup({
      priznak: new FormControl(Priznak.rashod),
      name: new FormControl(h?.name || '', Validators.required),
      category1: new FormControl(h?.category.category1 || '', Validators.required),
      category2: new FormControl(h?.category.category2 || ''),
      category3: new FormControl(h?.category.category3 || ''),
      category4: new FormControl(h?.category.category4 || ''),
      description: new FormControl(h?.description || ''),
      qntyOrWeight: new FormControl(h?.qntyOrWeight || QntyOrWeight.qnty),
      qntyOrWeightNum: new FormControl(h?.qntyOrWeightNum || 0, Validators.required),
      date: new FormControl(h?.date ? new Date(Object(h.date).seconds * 1000) : new Date()),
      price: new FormControl(h ? Math.abs(Number(h.price)) : null, [Validators.required, Validators.min(0.1)]),
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()
// @ts-ignore
    return this.namesArr.filter(name => name.toLowerCase().includes(filterValue))
  }

  private _getNames(): void {
    if (!this.dataDialog[1]) {
      this.service.getAllHistory().subscribe((data) => {
        if (data) {
          this.historyData = data.map((res: { payload: { doc: { id: string; data: () => IHistory[]; }; }; }) => {
            return <IHistory[]>{
              id: res.payload.doc.id,
              ...res.payload.doc.data(),
            }
          })
          this.namesArr = this.historyData.map(h => String(h.name)).filter(unique).sort()
        }
      })
    }
  }

  private _setValueToFormByName(name: string) {
// @ts-ignore
    const history: IHistory = this.historyData.filter(h => h.name.toLowerCase().includes(name.toLowerCase()))[0]
    delete history.id
    delete history.description
    delete history.date
    delete history.createdBy
    this._setForm(history)
  }

  private getCategories() {
    this.categories$ = this.service
      .getAllCategories()
      .pipe(map((res: [{ payload: { doc: { id: string; data: () => ICategory[]; }; }; }]) => {
        const cats: ICategory[] = []
        res.forEach(d => {
          cats.push({
            category1: '',
            priznak: Priznak.rashod,
            id: d.payload.doc.id,
            ...d.payload.doc.data(),
          })
        })
        return cats.filter(data => data.priznak === Priznak.rashod)
      }))
  }

  onInputName(event: string) {
    if (this.namesArr.includes(event)) {
      this._setValueToFormByName(event)
    }
  }

  onSubmit() {
    const values = this.form.value
    const newHistoryRow: IHistory = {
      id: this.dataDialog[1]?.id,
      name: values.name,
      description: values.description,
      category: {
        priznak: Priznak.rashod,
        category1: values.category1,
        category2: values.category2,
        category3: values.category3,
        category4: values.category4,
      },
      price: -values.price,
      createdBy: users[0],
      date: new Date(),
      qntyOrWeight: values.qntyOrWeight,
      qntyOrWeightNum: values.qntyOrWeightNum,
    }
    this.dialogRef.close(newHistoryRow)
  }

  onCancel() {
    this.dialogRef.close(null)
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(ModalAddCategoryComponent, {
      data: [Priznak.rashod],
      maxWidth: '480px',
      minWidth: '320px',
    })

    dialogRef.afterClosed().subscribe((result: ICategory) => {
      if (result) {
        delete result.id
        this.service.addCategory(result)
        this.getCategories()
      }
    })
  }

  resetQntyOrWeightNum() {
    this.form.get('qntyOrWeightNum')?.setValue(0)
  }

  onDelete() {
    if (confirm('Удалить выбранную строку?')) {
      this.service.deleteHistoryRow(this.dataDialog[1].id)
      this.dialogRef.close(null)
    }
  }

  get category1() {
    return this.form.get('category1')
  }

  get category2() {
    return this.form.get('category2')
  }

  get category3() {
    return this.form.get('category3')
  }

  get category4() {
    return this.form.get('category4')
  }

  get description() {
    return this.form.get('description')
  }

  get date() {
    return this.form.get('date')
  }

  get price() {
    return this.form.get('price')
  }

  get qntyOrWeight() {
    return this.form.get('qntyOrWeight')
  }

  get qntyOrWeightNum() {
    return this.form.get('qntyOrWeightNum')
  }
}