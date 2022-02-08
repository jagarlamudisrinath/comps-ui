import { TestBed } from '@angular/core/testing';

import { RootScopeService } from './root-scope.service';

describe('RootScopeService', () => {
  let service: RootScopeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootScopeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
