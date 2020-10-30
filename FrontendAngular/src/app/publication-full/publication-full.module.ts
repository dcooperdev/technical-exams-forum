import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationFullComponent } from './publication-full.component';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { LikeComponent } from './like/like.component';

const routes: Routes = [
  { path: '', component: PublicationFullComponent }
];

@NgModule({
  declarations: [PublicationFullComponent, LikeComponent, CommentComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicationFullModule { }
