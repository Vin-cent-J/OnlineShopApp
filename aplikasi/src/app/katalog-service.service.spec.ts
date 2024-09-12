import { TestBed } from '@angular/core/testing';

import { KatalogServiceService } from './katalog-service.service';

describe('KatalogServiceService', () => {
  let service: KatalogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatalogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
