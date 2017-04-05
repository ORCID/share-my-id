import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-id-error',
  templateUrl: './add-id-error.component.html',
  styleUrls: ['./add-id-error.component.scss']
})
export class AddIdErrorComponent implements OnInit {
  private sub: any;
  private publicKey: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    	this.sub = this.route.params.subscribe(params => {
            this.publicKey = params['publicKey'];
        });  	
  }

}
