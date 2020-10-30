import { DeletePublication } from './../states/publications/publication.actions';
import { Publications } from './../states/publications/publication.reducer';
import { AppState } from './../app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Publication } from '../Interfaces/publication.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../services/publications/publications.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  private publicationId: string;
  public publication: any;

  constructor( private store: Store<AppState>,
               private route: ActivatedRoute,
               private router: Router,
               private publicationService: PublicationsService ) {
    this.route.paramMap.subscribe(params => {
      this.publicationId = params.get('id');
    });

    store.select('blog')
         .subscribe(
           (list: Publications) =>
              this.publication = list.publications.filter( publication => publication._id === this.publicationId )[0]
         );
  }

  ngOnInit() {
  }

  delete() {
    this.publicationService.deletePublicationById( this.publicationId )
        .subscribe(
          (response: Publication) => {
            if ( !response.published ) {
              const DeleteAction = new DeletePublication(response._id);
              this.store.dispatch( DeleteAction );
              this.router.navigate(['/']);
            }
          }
        );
  }

}
