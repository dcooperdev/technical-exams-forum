import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SignupService } from '../services/auth/signup.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetSession } from '../states/session/session.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm:FormGroup;
  public error: string = '';

  constructor( private signup: SignupService,
               private router: Router,
               private jwt: JwtHelperService,
               private store: Store<AppState>  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      complete_name: new FormControl('', [Validators.required]),
      username_email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {

    this.signup.send( this.signupForm.value )
        .subscribe(
          ( response: string ) => {
            localStorage.setItem('token', `bearer ${response}`);

            const userSession = new SetSession( response, this.jwt.decodeToken(response).data );
            this.store.dispatch( userSession );

            this.router.navigate(['/']);
          }, error => {
            this.error = error.error;
          }
        );
  }


}
