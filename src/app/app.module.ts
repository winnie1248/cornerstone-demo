import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebImageLoaderComponent } from './web-image-loader/web-image-loader.component';
import { WadoImageLoaderComponent } from './wado-image-loader/wado-image-loader.component';
import { ToolsComponent } from './tools/tools.component';

@NgModule({
  declarations: [
    AppComponent,
    WebImageLoaderComponent,
    WadoImageLoaderComponent,
    ToolsComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
