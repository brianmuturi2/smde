import { TestBed } from '@angular/core/testing';

import { TrustService } from './special.service';

describe('TrustService', () => {
  let service: TrustService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrustService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
