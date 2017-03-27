import { TestBed, inject } from '@angular/core/testing';

import { CollectionService } from './collection.service';

describe('CollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionService]
    });
  });

  it('should ...', inject([CollectionService], (service: CollectionService) => {
    expect(service).toBeTruthy();
  }));
});
