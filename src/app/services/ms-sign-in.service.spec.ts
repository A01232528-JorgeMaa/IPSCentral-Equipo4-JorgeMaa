import { TestBed } from '@angular/core/testing';

import { MsSignInService } from './ms-sign-in.service';

describe('MsSignInService', () => {
  let service: MsSignInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsSignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
