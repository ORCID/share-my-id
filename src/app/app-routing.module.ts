import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionFormComponent } from './collection-form/collection-form.component';
import { CollectionLinksComponent } from './collection-links/collection-links.component';
import { PageHomeComponent } from './page-home/page-home.component';

const routes: Routes = [
    {
        component: PageHomeComponent, //Authenticate -> Redirects to editCollection
        path: '' // update to 'create-smid-authorize'
    },
    {
        component: CollectionLinksComponent,
        path: ':publicKey'
    },
    {
        component: CollectionFormComponent,
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
            RouterModule.forRoot(routes, { useHash: false })
        ],
        exports: [
            RouterModule
        ],
        providers: []
    }
)
export class AppRoutingModule { }