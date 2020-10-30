import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';
import { User } from '../Interfaces/user.interface';
import { Session } from './../states/session/session.reducer';
import { UnsetSession } from '../states/session/session.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public session: User;

  constructor( private store: Store<AppState>, private router: Router ) {
    store.select('session')
         .subscribe(
           (( session: Session ) => this.session = session.user)
         );
  }

  ngOnInit() {
  }

  closeSession() {
    const UnsetSessionAction = new UnsetSession();
    this.store.dispatch( UnsetSessionAction );
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
