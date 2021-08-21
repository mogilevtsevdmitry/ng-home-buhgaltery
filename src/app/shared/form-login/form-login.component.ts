import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {DaoService} from '../dao.service'
import {IUser} from '../interfaces'
import {Router} from '@angular/router'

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  formGroup: any

  constructor(
    private readonly authService: DaoService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    const credential: IUser = this.formGroup?.value
    this.authService
      .signIn(credential)
      .then(_ => this.goToIndex())
      .catch(err => console.log('error', err))
  }

  private goToIndex() {
    setTimeout(() => this.route.navigate(['/index']), 1)
  }

  get email() {
    return this.formGroup.get('email')
  }

  get password() {
    return this.formGroup.get('password')
  }
}
