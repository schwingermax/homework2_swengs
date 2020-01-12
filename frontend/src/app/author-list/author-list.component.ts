import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthorService} from '../service/author.service';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  authors: any[];
  displayedColumns = ['name', 'vorname', 'geburtsdatum', 'id', 'eyecolour', 'renowned', 'id']; //
  viewDate: Date = new Date();
  events = [];

  constructor(private http: HttpClient, private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthors()
      .subscribe((response: any[]) => {
        this.authors = response;
      });
  }

  deleteAuthor(author: any) {
    this.authorService.deleteAuthor(author)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
