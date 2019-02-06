import { TestBed } from '@angular/core/testing';

import { PasswordCheckerLibService } from './password-checker-lib.service';

describe('PasswordCheckerLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordCheckerLibService = TestBed.get(PasswordCheckerLibService);
    expect(service).toBeTruthy();
  });
});
