import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }


retrieveAuthorOptions() {
  return this.http.get <any[]>('/api/author/options');
}

  getAuthors() {
    return this.http.get('/api/author/list');
  }

  createAuthor(author: any) {
    return this.http.post('/api/author/create', author);
  }

  updateAuthor(author: any) {
    return this.http.put('/api/author/' + author.id + '/update', author);
  }

  deleteAuthor(author: any) {
    return this.http.delete('/api/author/' + author.id + '/delete');
  }

}
