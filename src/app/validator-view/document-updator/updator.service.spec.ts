import { TestBed } from '@angular/core/testing';

import { UpdatorService } from './updator.service';

describe('UpdatorService', () => {
  let service: UpdatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
