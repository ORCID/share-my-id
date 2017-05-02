import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, JsonpModule } from '@angular/http';
import { OrcidUtilService } from '../../shared/orcid-util/orcid-util.service';
import { CollectionService } from '../../shared/collection/collection.service';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
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

  it('should ...', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
