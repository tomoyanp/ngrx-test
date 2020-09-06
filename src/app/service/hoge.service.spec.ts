import { TestBed } from '@angular/core/testing';

import { HogeService } from './hoge.service';

describe('HogeService', () => {
  let service: HogeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HogeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
