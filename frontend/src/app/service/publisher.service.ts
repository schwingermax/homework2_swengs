import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }


  retrievePublisherOptions() {
    return this.http.get <any[]>('/api/publisher/options');
  }

  getPublishers() {
    return this.http.get('/api/publisher/list');
  }

  createPublisher(publisher: any) {
    return this.http.post('/api/publisher/create', publisher);
  }

  updatePublisher(publisher: any) {
    return this.http.put('/api/publisher/' + publisher.id + '/update', publisher);
  }

  deletePublisher(publisher: any) {
    return this.http.delete('/api/publisher/' + publisher.id + '/delete');
  }

}
