import { TestBed } from '@angular/core/testing';

import { CreateAccountApiService } from './create-account-api.service';

describe('CreateAccountApiService', () => {
  let service: CreateAccountApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAccountApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
