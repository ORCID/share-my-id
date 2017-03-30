import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageAddMyIdComponent } from './page-add-my-id/page-add-my-id.component';

const routes: Routes = [
    {
        component: PageHomeComponent, //Authenticate -> Redirects to editCollection
        path: '' // update to 'create-smid-authorize'
    },
    {
        component: PageAddMyIdComponent,
        path: ':publicKey'
    },
    {
        component: CreateCollectionComponent,
        path: ':publicKey/edit/:privateKey'
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