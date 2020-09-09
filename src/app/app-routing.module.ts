import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebImageLoaderComponent } from './web-image-loader/web-image-loader.component';
import { WadoImageLoaderComponent } from './wado-image-loader/wado-image-loader.component';
import { ToolsComponent } from './tools/tools.component';

const routes: Routes = [
  { path: 'web-image', component: WebImageLoaderComponent },
  { path: 'wado-image', component: WadoImageLoaderComponent },
  { path: 'tools', component: ToolsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'web-image' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
