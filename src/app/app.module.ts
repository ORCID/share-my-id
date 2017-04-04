import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CollectionService } from './shared/collection/collection.service';

import { CollectionFormComponent } from './collection-form/collection-form.component';
import { CollectionLinksComponent } from './collection-links/collection-links.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageAddMyIdComponent } from './page-add-my-id/page-add-my-id.component';
import { PageHomeComponent } from './page-home/page-home.component';


@NgModule({
  declarations: [
    AppComponent,
    CollectionFormComponent,
    CollectionLinksComponent,
    FooterComponent,
    HeaderComponent,
    PageHomeComponent,
    PageAddMyIdComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    CollectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
