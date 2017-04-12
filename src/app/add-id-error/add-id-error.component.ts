import { ActivatedRoute, Routes, RouterModule } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { OrcidUtilService } from './../shared/orcid-util/orcid-util.service';

@Component({
  selector: 'app-add-id-error',
  templateUrl: './add-id-error.component.html',
  styleUrls: ['./add-id-error.component.scss']
})
export class AddIdErrorComponent implements OnInit, OnDestroy {

    private sub: any;
    public publicKey: string;

    constructor(
        private orcidUtilService: OrcidUtilService,
        private route: ActivatedRoute
    ) { }

    authenticate(): void {
        this.orcidUtilService.addIdAuth(this.publicKey);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                this.publicKey = params['publicKey'];
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
