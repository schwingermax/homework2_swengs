import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookService} from '../service/book.service';
import {GenreService} from '../service/genre.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: any[];
  displayedColumns = ['title', 'genre', 'erscheinungsdatum', 'handlung', 'author', 'publisher_name', 'id'];

  constructor(private http: HttpClient, private bookService: BookService, public genreService: GenreService) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((response: any[]) => {
        this.books = response;
      });
      }

  deleteBook(book: any) {
    this.bookService.deleteBook(book)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
