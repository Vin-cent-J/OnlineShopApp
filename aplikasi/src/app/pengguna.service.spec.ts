import { TestBed } from '@angular/core/testing';

import { PenggunaService } from './pengguna.service';

describe('PenggunaService', () => {
  let service: PenggunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenggunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
