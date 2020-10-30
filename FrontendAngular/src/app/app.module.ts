import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicationModule } from './publication/publication.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicationsComponent } from './publications/publications.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

/* Angular Material */
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridListResponsiveModule } from './directives/mat-grid-list-responsive/mat-grid-list-responsive.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PublicationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PublicationModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: environment.production
      }
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost'],
        blacklistedRoutes: ['localhost/login', 'localhost/signup']
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatGridListResponsiveModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
