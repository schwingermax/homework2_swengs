import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import {DateComponent} from './date/date.component';
import {AuthorListComponent, momentAdapterFactory} from './author-list/author-list.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import {JwtModule} from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherFormComponent } from './publisher-form/publisher-form.component';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    DateComponent,
    AuthorListComponent,
    AuthorFormComponent,
    LoginComponent,
    LogoutComponent,
    PublisherListComponent,
    PublisherFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    JwtModule.forRoot(
      {config:{
          tokenGetter,
          whitelistedDomains: ['localhost:4200']
        }
      }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
