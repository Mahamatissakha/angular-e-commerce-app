import { TestBed } from '@angular/core/testing';

import { ProducatservicesService } from './producatservices.service';

describe('ProducatservicesService', () => {
  let service: ProducatservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducatservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
