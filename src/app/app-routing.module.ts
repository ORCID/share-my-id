import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { PageHomeComponent } from './page-home/page-home.component';

const routes: Routes = [
    {
        component: PageHomeComponent, 
        path: ''
    },

    {
        component: CreateCollectionComponent,
        path: 'create-collection'
    },
    {
        component: EditCollectionComponent,
        path: ':publicKey/edit-collection/:privateKey'
    },
    {
        path: '**', 
        redirectTo: '' 
    }
];

@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
        providers: []
    }
)
export class AppRoutingModule { }