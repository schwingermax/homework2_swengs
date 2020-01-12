import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookFormComponent} from './book-form/book-form.component';
import {AuthorListComponent} from './author-list/author-list.component';
import {AuthorFormComponent} from './author-form/author-form.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {PublisherListComponent} from './publisher-list/publisher-list.component';
import {PublisherFormComponent} from './publisher-form/publisher-form.component';


const routes: Routes = [
  { path: 'book-list', component: BookListComponent, canActivate: [AuthGuard]},
  { path: 'book-form', component: BookFormComponent, canActivate: [AuthGuard] },
  {path: 'book-form/:id', component: BookFormComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'book-list', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'author-list', component: AuthorListComponent, canActivate: [AuthGuard] },
  { path: 'author-form', component: AuthorFormComponent, canActivate: [AuthGuard] },
  {path: 'author-form/:id', component: AuthorFormComponent, canActivate: [AuthGuard]},
  { path: 'publisher-list', component: PublisherListComponent, canActivate: [AuthGuard] },
  { path: 'publisher-form', component: PublisherFormComponent, canActivate: [AuthGuard] },
  { path: 'publisher-form/:id', component: PublisherFormComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
