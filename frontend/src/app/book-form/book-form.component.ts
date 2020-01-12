import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GenreService} from '../service/genre.service';
import {PublisherService} from '../service/publisher.service';
import {AuthorService} from '../service/author.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BookService} from '../service/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookFormGroup;
  age;
  publisherOptions;
  authorOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router, public genreService: GenreService,
              private publisherService: PublisherService, private authorService: AuthorService, private bookService: BookService) {
  }

  ngOnInit() {
    this.bookFormGroup = this.fb.group({
      'id': [null],
      'title' : ['', [Validators.required]], //this.titleValidator()]],
      'genre': [null],
      'erscheinungsdatum': [null, Validators.required],
      'handlung' : ['', [Validators.required, this.badWordValidator()]],
      'verfügbar' : [true],
      'publisher': [null],
      'author': [[]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/book/' + id + '/get')
        .subscribe((response) => {
          this.bookFormGroup.patchValue(response);
        });
    }

    this.bookFormGroup.controls.erscheinungsdatum.valueChanges.subscribe(() => {
      const erscheinungsdatum = this.bookFormGroup.controls.erscheinungsdatum.value;
      this.age = undefined;
      if (erscheinungsdatum) {
        this.age = this.calculateAge(new Date(erscheinungsdatum));
      }
    });

    this.publisherService.retrievePublisherOptions().subscribe((result) => {
        this.publisherOptions = result;
      });
    this.authorService.retrieveAuthorOptions().subscribe((result) => {
      this.authorOptions = result;
    });
  }

  createBook() {
    const book = this.bookFormGroup.value;  alert(book);
    if (book.id) {
      this.bookService.updateBook(book)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else{
        this.bookService.createBook(book)
          .subscribe((response: any) => {
            this.router.navigate(['book-form/' + response.id]);
          });
      }
    }

  calculateAge(date) {
    var ageDifMs = Date.now() - date;
    if (ageDifMs > 0) {
      var ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return 0;
    }
  }
  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} |  null => {
      const forbidden = /bad word/.test(control.value);
      return forbidden ? {badWord: {value: control.value}} : null;
    };
  }
}
