import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PublisherService} from '../service/publisher.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss']
})
export class PublisherListComponent implements OnInit {

  publishers: any[];
  displayedColumns =  ['name', 'responsible', 'responsible_vorname', 'scientific', 'gruendungsdatum', 'id']


  constructor(private http: HttpClient, private publisherService: PublisherService) { }

  ngOnInit() {
    this.publisherService.getPublishers()
      .subscribe((response: any[]) => {
        this.publishers = response;
      });
  }

  deletePublisher(publisher: any) {
    this.publisherService.deletePublisher(publisher)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}

