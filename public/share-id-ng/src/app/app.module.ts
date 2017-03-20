import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CollectionFormComponent } from './collection-form/collection-form.component';
import { CollectionLinksComponent } from './collection-links/collection-links.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CollectionFormComponent,
    CollectionLinksComponent,
    CreateCollectionComponent,
    EditCollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
