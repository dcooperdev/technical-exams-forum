import { AppState } from './../app.reducer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationsService } from '../services/publications/publications.service';
import { Publication } from '../Interfaces/publication.interface';
import { UpdatePublication, SetPublication } from '../states/publications/publication.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-publication',
  templateUrl: './admin-publication.component.html',
  styleUrls: ['./admin-publication.component.scss']
})
export class AdminPublicationComponent implements OnInit {

  public publicationForm: FormGroup;
  public publicationData: Publication;
  public edit = false;
  private publicationId = null;

  constructor( private publication: PublicationsService,
               private route: ActivatedRoute,
               private router: Router,
               private store: Store<AppState>) {
    this.route.paramMap.subscribe(params => {
      this.publicationId = params.get('id');
    });

    if ( this.publicationId !== null ) {
      this.publication.getPublicationById( this.publicationId )
        .subscribe( (profile: Publication) => {
          this.publicationData = profile;

          this.publicationForm.controls['title'].setValue(this.publicationData.title);
          this.publicationForm.controls['body'].setValue(this.publicationData.body);
          this.publicationForm.controls['image'].setValue(this.publicationData.image);

          this.edit = true;
        });
    }
  }

  ngOnInit() {
    this.publicationForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  submit() {

    if ( !this.edit ) {
      this.publication.createPublication( this.publicationForm.value )
          .subscribe(
            (response: any) => {
              const LikeAction = new SetPublication( response );
              this.store.dispatch( LikeAction );
              this.router.navigate(['/publication', response._id]);
            }
          );
    } else {
      this.publication.updatePublication({ id: this.publicationId, ...this.publicationForm.value })
          .subscribe(
            (response: any) => {
              const LikeAction = new UpdatePublication( response );
              this.store.dispatch( LikeAction );
              this.router.navigate(['/publication', response._id]);
            }
          );
    }
  }

}
