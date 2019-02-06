import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCheckerLibComponent } from './password-checker-lib.component';

describe('PasswordCheckerLibComponent', () => {
  let component: PasswordCheckerLibComponent;
  let fixture: ComponentFixture<PasswordCheckerLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordCheckerLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCheckerLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
