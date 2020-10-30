import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  send( data ) {
    const { username_email, password } = data;

    return this.http.post(`${this.url}/api/v1/login`, {
      username_email,
      password
    });
  }
}
