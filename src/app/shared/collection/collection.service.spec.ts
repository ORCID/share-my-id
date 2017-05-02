import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, JsonpModule } from '@angular/http';
import { OrcidUtilService } from '../../shared/orcid-util/orcid-util.service';
import { ConfigService } from '../../shared/config/config.service';
import { CollectionService } from './collection.service';

describe('CollectionService', () => {
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

  it('should ...', inject([CollectionService], (service: CollectionService) => {
    expect(service).toBeTruthy();
  }));
});
