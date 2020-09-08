import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebImageLoaderComponent } from './web-image-loader/web-image-loader.component';

const routes: Routes = [
  { path: 'web-image', component: WebImageLoaderComponent },
  { path: '', pathMatch: 'full', redirectTo: 'web-image' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
