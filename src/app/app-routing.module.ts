import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { PageAddMyIdComponent } from './page-add-my-id/page-add-my-id.component';
import { PageHomeComponent } from './page-home/page-home.component';

const routes: Routes = [
    {
        component: PageHomeComponent, //Authenticate -> Redirects to editCollection
        path: 'test' // update to 'create-smid-authorize'
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
        imports: [
            RouterModule.forRoot(routes, { useHash: true })
        ],
        exports: [
            RouterModule
        ],
        providers: []
    }
)
export class AppRoutingModule { }