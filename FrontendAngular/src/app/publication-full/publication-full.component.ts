import { User } from './../Interfaces/user.interface';
import { UpdatePublication } from './../states/publications/publication.actions';
import { AppState } from './../app.reducer';
import { Publication } from './../Interfaces/publication.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../services/publications/publications.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-publication-full',
  templateUrl: './publication-full.component.html',
  styleUrls: ['./publication-full.component.scss']
})
export class PublicationFullComponent implements OnInit {

  private publicationId: string;
  public publicationData: Publication;
  public userData: User;

  public owner = false;
  public liked = false;
  public commented = false;

  constructor( private publication: PublicationsService,
               private route: ActivatedRoute,
               private store: Store<AppState> ) {
    this.route.paramMap.subscribe(params => {
      this.publicationId = params.get('id');
    });
  }

  ngOnInit() {


    this.store.subscribe(
      (state: AppState) => {
        this.userData = state.session.user;
        this.publicationData = state.blog.publications.filter( publication => publication._id === this.publicationId )[0];
        this.publicationPermissions();
      }
    );
  }

  isOwner(): boolean {
    return this.userData.username_email === this.publicationData.owner;
  }

  isLiked(): boolean {
    return this.publicationData.likes.filter( like => like.user === this.userData._id)[0] ? true : false;
  }

  isCommented(): boolean {
    return this.publicationData.comments.filter( comment => comment.user === this.userData._id)[0] ? true : false;
  }

  publicationPermissions() {
    if ( this.userData !== null ) {
      this.owner = this.isOwner();
      this.liked = this.isLiked();
      this.commented = this.isCommented();
    }
  }

  newLike() {
    this.publication.likePublication( this.publicationId )
        .subscribe(
          (response: any) => {
            const LikeAction = new UpdatePublication( response );
            this.store.dispatch( LikeAction );

            this.liked = this.isLiked();
          }
        );
  }

  newComment( e ) {
    this.publication.commentPublication( this.userData.complete_name, this.publicationId, e )
        .subscribe(
          (response: any) => {
            const CommentAction = new UpdatePublication( response );
            this.store.dispatch( CommentAction );

            this.commented = this.isCommented();
          }
        );
  }

}
