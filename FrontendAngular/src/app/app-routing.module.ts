import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicationsComponent } from './publications/publications.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', component: PublicationsComponent },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'publication/:id', loadChildren: () => import('./publication-full/publication-full.module').then(m => m.PublicationFullModule) },
  {
    path: 'new',
    loadChildren: () => import('./admin-publication/admin-publication.module').then(m => m.AdminPublicationModule),
  },
  {
    path: 'new/:id',
    loadChildren: () => import('./admin-publication/admin-publication.module').then(m => m.AdminPublicationModule),
  },
  {
    path: 'admin/:id',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
    canLoad: [AdminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
