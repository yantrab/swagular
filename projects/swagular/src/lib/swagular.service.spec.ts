import { TestBed } from '@angular/core/testing';

import { SwagularService } from './swagular.service';

describe('SwagularService', () => {
  let service: SwagularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwagularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
