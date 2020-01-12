import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PublisherService} from '../service/publisher.service';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.scss']
})
export class PublisherFormComponent implements OnInit {

  publisherFormGroup;
  age;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private publisherService: PublisherService) {
  }

  ngOnInit() {
    this.publisherFormGroup = this.fb.group({
      'id': [null],
      'name' : [''],
      'responsible': [null],
      'responsible_vorname' : [null],
      'gruendungsdatum' : [null],
      'scientific' : [null],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/publisher/' + id + '/get')
        .subscribe((response) => {
          this.publisherFormGroup.patchValue(response);
        });
    }
  }

  createPublisher() {
    const publisher = this.publisherFormGroup.value;
    if (publisher.id) {
      this.publisherService.updatePublisher(publisher)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else{
      this.publisherService.createPublisher(publisher)
        .subscribe((response: any) => {
          this.router.navigate(['publisher-form/' + response.id]);
        });
    }
  }

}
