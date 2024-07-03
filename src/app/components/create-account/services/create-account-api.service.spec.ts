import { TestBed } from '@angular/core/testing';

import { CreateAccountApiService } from './create-account-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateAccountApiService', () => {
  let service: CreateAccountApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreateAccountApiService],
    });
    service = TestBed.inject(CreateAccountApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
