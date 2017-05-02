import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, JsonpModule } from '@angular/http';

import { OrcidUtilService } from './orcid-util.service';
import { CollectionService } from '../../shared/collection/collection.service';
import { ConfigService } from '../../shared/config/config.service';


describe('OrcidUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [        
      	HttpModule,
        JsonpModule
      ],
      providers: [
        CollectionService,
        ConfigService,
        OrcidUtilService
    ],

    });
  });

  it('should ...', inject([OrcidUtilService], (service: OrcidUtilService) => {
    expect(service).toBeTruthy();
  }));
});
