import { AppState } from './../app.reducer';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from '@ngrx/store';
import { SetSession } from '../states/session/session.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public error: string = '';

  constructor( private login: LoginService,
               private router: Router,
               private jwt: JwtHelperService,
               private store: Store<AppState> ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username_email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    this.login.send( this.loginForm.value )
        .subscribe( (response: string) => {
          localStorage.setItem('token', `bearer ${response}`);

          const userSession = new SetSession( response, this.jwt.decodeToken(response).data );
          this.store.dispatch( userSession );

          this.router.navigate(['/']);
        }, error => {console.log(error);
          this.error = error.error;
        });
  }

}
