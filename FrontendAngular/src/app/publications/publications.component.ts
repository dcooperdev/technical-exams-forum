import { Publications } from './../states/publications/publication.reducer';
import { User } from 'src/app/Interfaces/user.interface';
import { Session } from './../states/session/session.reducer';
import { Component, OnInit } from '@angular/core';
import { Publication } from '../Interfaces/publication.interface';
import { PublicationsService } from '../services/publications/publications.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetPublications } from '../states/publications/publication.actions';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  public publicationsList: Publication[];
  public user: User;

  constructor( private publications: PublicationsService, private store: Store<AppState> ) {

    this.publications.getPublicationsList().subscribe(
      (response: Publication[]) => {
        const PublicationsAction = new SetPublications( response );
        this.store.dispatch( PublicationsAction );
      }
    );

    store.select('blog').subscribe(
      (list: Publications) => {
        this.publicationsList = list.publications;
      }
    );

    store.select('session').subscribe((session: Session) => this.user = session.user);
  }

  ngOnInit() {
  }

}
