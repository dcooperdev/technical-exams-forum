import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  send( data ) {
    const { complete_name, username_email, password } = data;

    return this.http.post(`${this.url}/api/v1/signup`, {
      complete_name,
      username_email,
      password
    });
  }

  checkEmailExists( username_email: string ) {
    return this.http.get(`${this.url}/api/v1/signup`, {
      headers: new HttpHeaders({
        username_email
      })
    });
  }
}
