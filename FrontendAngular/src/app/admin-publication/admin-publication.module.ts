import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPublicationComponent } from './admin-publication.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AdminPublicationComponent }
];

@NgModule({
  declarations: [AdminPublicationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminPublicationModule { }
