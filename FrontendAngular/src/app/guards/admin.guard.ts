import { Session } from './../states/session/session.reducer';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  private isAdmin = false;

  constructor( private store: Store<AppState> ) {
    store.select('session')
         .subscribe(
           (user: Session) => this.isAdmin = (user.user.rol === 'admin')
         );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin;
  }
}
