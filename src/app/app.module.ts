import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CollectionService } from './shared/collection/collection.service';
import { AuthInfoService } from './shared/auth-info/auth-info.service';

import { CollectionFormComponent } from './collection-form/collection-form.component';
import { CollectionLinksComponent } from './collection-links/collection-links.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageAddMyIdComponent } from './page-add-my-id/page-add-my-id.component';
import { PageConfirmCollectionComponent } from './page-confirm-collection/page-confirm-collection.component';
import { PageHomeComponent } from './page-home/page-home.component';


@NgModule({
  declarations: [
    AppComponent,
    CollectionFormComponent,
    CollectionLinksComponent,
    CreateCollectionComponent,
    FooterComponent,
    HeaderComponent,
    PageConfirmCollectionComponent,
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
    AuthInfoService,
    CollectionService,
    {provide: Window, useValue: window} // get's the browsers window info
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
