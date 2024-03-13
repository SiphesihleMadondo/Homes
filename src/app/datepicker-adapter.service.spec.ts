import { TestBed } from '@angular/core/testing';

import { DatepickerAdapterService } from './datepicker-adapter.service';

describe('DatepickerAdapterService', () => {
  let service: DatepickerAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatepickerAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
