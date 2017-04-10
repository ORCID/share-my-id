import { TestBed, inject } from '@angular/core/testing';

import { OrcidUtilService } from './orcid-util.service';

describe('OrcidUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrcidUtilService]
    });
  });

  it('should ...', inject([OrcidUtilService], (service: OrcidUtilService) => {
    expect(service).toBeTruthy();
  }));
});
