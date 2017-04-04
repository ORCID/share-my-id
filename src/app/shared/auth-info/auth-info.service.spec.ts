import { TestBed, inject } from '@angular/core/testing';

import { AuthInfoService } from './auth-info.service';

describe('AuthInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInfoService]
    });
  });

  it('should ...', inject([AuthInfoService], (service: AuthInfoService) => {
    expect(service).toBeTruthy();
  }));
});
