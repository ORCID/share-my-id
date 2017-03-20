import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    component: CreateCollectionComponent,
    path: 'create-collection'
  },
  {
    component: EditCollectionComponent,
    path: ':id1/edit-collection/:id2'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
