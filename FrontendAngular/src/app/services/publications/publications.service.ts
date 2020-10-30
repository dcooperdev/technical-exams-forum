import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  getPublicationsList() {
    return this.http.get(`${this.url}/api/v1/publication`);
  }

  getPublicationById( id ) {
    return this.http.get(`${this.url}/api/v1/publication`, {
      headers: new HttpHeaders({
        id
      })
    });
  }

  deletePublicationById( id ) {
    return this.http.delete(`${this.url}/api/v1/publication`, {
      headers: new HttpHeaders()
      .set('id', id)
      .set('state', 'false')
      .set('authorization', localStorage.getItem('token'))
    });
  }

  createPublication( data ) {
    const { title, body, image } = data;
    return this.http.post(`${this.url}/api/v1/publication`, { title, body, image }, {
      headers: new HttpHeaders()
      .set('authorization', localStorage.getItem('token'))
      }
    );
  }

  updatePublication( data ) {
    const { id, title, body, image } = data;
    return this.http.put(`${this.url}/api/v1/publication`, { id, title, body, image, published: true }, {
      headers: new HttpHeaders()
      .set('authorization', localStorage.getItem('token'))
      }
    );
  }

  likePublication( publication ) {
    return this.http.post(`${this.url}/api/v1/like`, { publication }, {
      headers: new HttpHeaders()
      .set('authorization', localStorage.getItem('token'))
      }
    );
  }

  commentPublication( fullname, publication,  comment ) {
    return this.http.post(`${this.url}/api/v1/comment`, { fullname, publication, comment }, {
      headers: new HttpHeaders()
      .set('authorization', localStorage.getItem('token'))
      }
    );
  }

}
