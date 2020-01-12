import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GenreService} from '../service/genre.service';
import {PublisherService} from '../service/publisher.service';
import {AuthorService} from '../service/author.service';
import {BookService} from '../service/book.service';



@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  authorFormGroup;
  age;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router, private authorService: AuthorService) {
  }

  ngOnInit() {
    this.authorFormGroup = this.fb.group({
      'id': [null],
      'name' : ['', [Validators.required]],
      'vorname': [null],
      'geburtsdatum': [null, Validators.required],
      'eyecolour': [null],
      'renowned': [null],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/author/' + id + '/get')
        .subscribe((response) => {
          this.authorFormGroup.patchValue(response);
        });
    }

    this.authorFormGroup.controls.geburtsdatum.valueChanges.subscribe(() => {
      const geburtsdatum = this.authorFormGroup.controls.geburtsdatum.value;
      this.age = undefined;
      if (geburtsdatum) {
        this.age = this.calculateAge(new Date(geburtsdatum));
      }
    });
  }

  createAuthor() {
    const author = this.authorFormGroup.value;
    if (author.id) {
      this.authorService.updateAuthor(author)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else{
      this.authorService.createAuthor(author)
        .subscribe((response: any) => {
          this.router.navigate(['author-form/' + response.id]);
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
}
