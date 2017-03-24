import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CollectionFormComponent } from './collection-form/collection-form.component';
import { CollectionLinksComponent } from './collection-links/collection-links.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { CollectionService } from './collection.service';
import { PageConfirmCollectionComponent } from './page-confirm-collection/page-confirm-collection.component';
import { PageHomeComponent } from './page-home/page-home.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionFormComponent,
    CollectionLinksComponent,
    CreateCollectionComponent,
    EditCollectionComponent,
    FooterComponent,
    HeaderComponent,
    PageConfirmCollectionComponent,
    PageHomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    CollectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
