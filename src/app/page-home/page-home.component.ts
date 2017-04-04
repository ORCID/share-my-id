import { Component, OnInit } from '@angular/core';

import { AuthInfoService } from './../shared/auth-info/auth-info.service';

@Component({
    selector: 'app-page-home',
    templateUrl: './page-home.component.html',
    styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

    constructor(
        private authInfoService: AuthInfoService
    ) { 
    }

    //Remove/refactor

    authenticate(): void {
        window.location.href  = '/create-smid-authorize';
    }

    ngOnInit() {
    }

}

