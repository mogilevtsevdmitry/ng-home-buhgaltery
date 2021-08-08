import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {CommonModule, registerLocaleData} from '@angular/common'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {BrowserModule} from '@angular/platform-browser'
import {AngularFireModule} from '@angular/fire'
import ru from '@angular/common/locales/ru'
import {NgModule} from '@angular/core'

import {environment} from '../environments/environment'
import {AppRoutingModule} from './app-routing.module'
import {SharedModule} from './shared/shared.module'
import {PagesModule} from './pages/pages.module'
import {AppComponent} from './app.component'

registerLocaleData(ru, 'ru')

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    PagesModule,
    SharedModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
