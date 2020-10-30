import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { SetSession } from './states/session/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private jwt: JwtHelperService, private store: Store<AppState> ) { }

  ngOnInit() {

    const sessionToken = localStorage.getItem('token');

    if ( sessionToken ) {
      const userSession = new SetSession( sessionToken, this.jwt.decodeToken(sessionToken).data );
      this.store.dispatch( userSession );
    }

  }

}
