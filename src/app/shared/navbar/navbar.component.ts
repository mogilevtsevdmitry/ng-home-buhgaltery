import {Component, OnInit} from '@angular/core'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {Observable} from 'rxjs'
import {map, shareReplay} from 'rxjs/operators'
import {DaoService} from '../dao.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  // @ts-ignore
  isAuth: Observable<boolean>

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    )

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: DaoService,
    private route: Router,
  ) {
  }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated()
  }

  logout() {
    this.authService
      .signOut()
      .then(_ => {
        this.route.navigate(['/login'])
      })
      .catch(err => console.log(err))
  }

}
