import {CommonModule, registerLocaleData} from '@angular/common'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import ru from '@angular/common/locales/ru'

import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {SharedModule} from './shared/shared.module'
import {PagesModule} from './pages/pages.module'
import {environment} from '../environments/environment'

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
