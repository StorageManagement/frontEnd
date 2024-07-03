import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isShow SHOULD be  equal to true WHEN show method is call', () => {
    service.isShow.subscribe((value) => {
      expect(value).toEqual(true);
    });

    service.show();
  });

  it('isShow SHOULD be  equal to false WHEN hide method is call', () => {
    service.isShow.subscribe((value) => {
      expect(value).toEqual(false);
    });

    service.hide();
  });
});
