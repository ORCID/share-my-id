import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionFormComponent } from './collection-form/collection-form.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    component: CollectionFormComponent,
    path: 'create-collection'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
