import {Component, Inject, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

import {ICategory, Priznak} from '../interfaces'
import {BuhgalteryService} from '../buhgaltery.service'

@Component({
  selector: 'app-modal-add-category',
  templateUrl: './modal-add-category.component.html',
  styleUrls: ['./modal-add-category.component.scss'],
})
export class ModalAddCategoryComponent implements OnInit {
  form: FormGroup
  title: string = Priznak.rashod
  isDel: boolean = false

  constructor(
    private dialogRef: MatDialogRef<ModalAddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDialog: [Priznak, ICategory, boolean],
    private servise: BuhgalteryService,
  ) {
    this.form = new FormGroup({
      priznak: new FormControl(this.dataDialog[0]),
      category1: new FormControl(
        this.dataDialog[1]?.category1 || '',
        Validators.required,
      ),
      category2: new FormControl(this.dataDialog[1]?.category2 || ''),
      category3: new FormControl(this.dataDialog[1]?.category3 || ''),
      category4: new FormControl(this.dataDialog[1]?.category4 || ''),
    })
  }

  ngOnInit(): void {
    this.title = this.dataDialog[0]
    this.isDel = this.dataDialog[2]
  }

  onSubmit() {
    const newCategory: ICategory = {
      id: this.dataDialog[1]?.id,
      priznak: this.form.value.priznak,
      category1: this.form.value.category1.trim(),
      category2: this.form.value.category2.trim(),
      category3: this.form.value.category3.trim(),
      category4: this.form.value.category4.trim(),
    }
    this.dialogRef.close(newCategory)
  }

  onDelete() {
    if (confirm('Удалить выбранную строку?')) {
      this.servise.deleteCategoryRow(this.dataDialog[1]?.id)
      this.dialogRef.close(null)
    }
  }

  onCancel() {
    this.dialogRef.close(null)
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
}
