import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddIdErrorComponent } from './add-id-error/add-id-error.component';
import { AddIdSuccessComponent } from './add-id-success/add-id-success.component';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';
import { CollectionEmailComponent } from './collection-email/collection-email.component';
import { CollectionShareComponent } from './collection-share/collection-share.component';
import { PageHomeComponent } from './page-home/page-home.component';

const routes: Routes = [
    {
        component: PageHomeComponent, // Authenticate -> Redirects to editCollection
        path: ''
    },
    {
        component: CollectionEmailComponent,
        path: 'create-smid-email'
    },
    /* Be sure to put urls with :dinamicParam after the ones that are static. Other way the evaluation will
       redirect to them instead of the expected url. */
    {
        component: AddIdErrorComponent,
        path: ':publicKey/add-id-error'
    },
    {
        component: CollectionEditComponent,
        path: ':publicKey/edit/:privateKey'
    },
    {
        component: AddIdSuccessComponent,
        path: ':publicKey/orcid/:orcid'
    },
    {
        component: CollectionShareComponent,
        path: ':publicKey'
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
