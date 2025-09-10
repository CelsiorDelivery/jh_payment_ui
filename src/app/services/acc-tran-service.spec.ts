import { TestBed } from '@angular/core/testing';

import { AccTranService } from './acc-tran-service';

describe('AccTranService', () => {
  let service: AccTranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccTranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
