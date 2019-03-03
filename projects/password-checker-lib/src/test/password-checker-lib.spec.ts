import { TestBed, async, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { fakeSchedulers } from 'rxjs-marbles/jasmine/angular';
import { PasswordCheckerLibDirective } from '../lib/password-checker-lib.directive';
import { PasswordCheckerConfigValue } from '../lib/password-checker.config';

@Component({
  selector: 'pwc-my-test-component',
  template: ''
})
class TestComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group( {
    password: ['', Validators.required],
  });

  formControl = new FormControl('', [Validators.required]);

  model = '';

  get pw() { return this.form.get('password'); }
}

describe('PasswordCheckerDirective Module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        PasswordCheckerLibDirective,
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    });
  }));

  describe('configuration and attaching of directive', () => {

    it('should be able to create the directive on a [form] formControlName without a provider and default configuration', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<form [formGroup]="form">
  <input type="password" formControlName="password" pwnedPasswordValidator>
</form>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        fixture.detectChanges();

        const directiveInstance = directiveEl.injector.get(PasswordCheckerLibDirective);
        expect(directiveInstance.pwnedPasswordApi).toBe('https://api.pwnedpasswords.com/range/');
        expect(directiveInstance.pwnedPasswordApiCallDebounceTime).toBe(400);
        expect(directiveInstance.pwnedPasswordMinimumOccurrenceForError).toBe(1);
      });
    }));

    it('should be able to create the directive on a [form] formControlName with a provider overriding the configuration', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<form [formGroup]="form">
  <input type="password" formControlName="password" pwnedPasswordValidator>
</form>`,
          providers: [{
            provide: PasswordCheckerConfigValue, useValue: {
              pwnedPasswordApi: 'a',
              pwnedPasswordApiCallDebounceTime: 16,
              pwnedPasswordMinimumOccurrenceForError: 2,
            }
          }]
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        fixture.detectChanges();

        const directiveInstance = directiveEl.injector.get(PasswordCheckerLibDirective);
        expect(directiveInstance.pwnedPasswordApi).toBe('a');
        expect(directiveInstance.pwnedPasswordApiCallDebounceTime).toBe(16);
        expect(directiveInstance.pwnedPasswordMinimumOccurrenceForError).toBe(2);
      });
    }));

    it('should be able to create the directive with a provider overriding the configuration with an incomplete object', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<form [formGroup]="form">
  <input type="password" formControlName="password" pwnedPasswordValidator>
</form>`,
          providers: [{
            provide: PasswordCheckerConfigValue, useValue: {
              pwnedPasswordApi: 'b',
            }
          }]
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        fixture.detectChanges();

        const directiveInstance = directiveEl.injector.get(PasswordCheckerLibDirective);
        expect(directiveInstance.pwnedPasswordApi).toBe('b');
        expect(directiveInstance.pwnedPasswordApiCallDebounceTime).toBe(400);
        expect(directiveInstance.pwnedPasswordMinimumOccurrenceForError).toBe(1);
      });
    }));


    it('should be possible to override the module config with @Input()', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<form [formGroup]="form">
  <input type="password" formControlName="password"
  pwnedPasswordValidator
  pwnedPasswordApi="e"
  pwnedPasswordApiCallDebounceTime="32"
  pwnedPasswordMinimumOccurrenceForError="3"
  >
</form>`,
          providers: [{
            provide: PasswordCheckerConfigValue, useValue: {
              pwnedPasswordApi: 'a',
              pwnedPasswordApiCallDebounceTime: 16,
              pwnedPasswordMinimumOccurrenceForError: 2,
            }
          }]
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        fixture.detectChanges();

        const directiveInstance = directiveEl.injector.get(PasswordCheckerLibDirective);
        expect(directiveInstance.pwnedPasswordApi).toBe('e');
        expect(directiveInstance.pwnedPasswordApiCallDebounceTime).toBe('32' as any);
        expect(directiveInstance.pwnedPasswordMinimumOccurrenceForError).toBe('3' as any);
      });
    }));

    it('should be possible to attach the directive to a formcontrol', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<input type="password" [formControl]="formControl"
  pwnedPasswordValidator
  >`,
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        fixture.detectChanges();

        const directiveInstance = directiveEl.injector.get(PasswordCheckerLibDirective);
        expect(directiveInstance.pwnedPasswordApi).toBe('https://api.pwnedpasswords.com/range/');
        expect(directiveInstance.pwnedPasswordApiCallDebounceTime).toBe(400);
        expect(directiveInstance.pwnedPasswordMinimumOccurrenceForError).toBe(1);
      });
    }));

    it('should be possible to be on a model', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<input type="password" [(ngModel)]="model"
  pwnedPasswordValidator
  >`,
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        fixture.detectChanges();

        const directiveInstance = directiveEl.injector.get(PasswordCheckerLibDirective);
        expect(directiveInstance.pwnedPasswordApi).toBe('https://api.pwnedpasswords.com/range/');
        expect(directiveInstance.pwnedPasswordApiCallDebounceTime).toBe(400);
        expect(directiveInstance.pwnedPasswordMinimumOccurrenceForError).toBe(1);
      });
    }));

    it('should be null, if the selectors are missing', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<input type="password" pwnedPasswordValidator
  >`,
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).toBeNull();

        fixture.detectChanges();
      });
    }));

  });

  describe(' calling the API after setting a value to the input', () => {
    const passwordSearchResult = `D0A4AA2E841C50022BB2EA424E43F8FC403:16
D10B1F9D5901978256CE5B2AD832F292D5A:1
D09CA3762AF61E59520943DC26494F8941B:23174662
D1618FACC3854462B7A0EF41914D22C41B6:2
D21307CAE168387A4C8E7559BC65382D1DB:49`;

    it('should call the API and set the form invalid for bad passwords', fakeSchedulers(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<form [formGroup]="form">
  <input type="password" formControlName="password" pwnedPasswordValidator>
</form>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        expect(component.pw.value).toBe('');
        component.pw.patchValue('123456');
        fixture.detectChanges();
        expect(component.pw.value).toBe('123456');
        tick(400);

        const httpTestingController = TestBed.get(HttpTestingController);
        const req = httpTestingController.expectOne('https://api.pwnedpasswords.com/range/7C4A8');
        expect(req.request.method).toEqual('GET');
        req.flush(passwordSearchResult);

        fixture.detectChanges();
        expect(component.pw.errors.pwnedPasswordOccurrence).not.toBe(null);
        expect(component.pw.errors.pwnedPasswordOccurrence).toBe(23174662);
        httpTestingController.verify();

      });
    }));

    it('should call the API and set the form valid for good passwords', fakeSchedulers(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<form [formGroup]="form">
  <input type="password" formControlName="password" pwnedPasswordValidator>
</form>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        expect(component.pw.value).toBe('');

        component.pw.patchValue('Angular Pwned Password Checker Directive');
        fixture.detectChanges();

        expect(component.pw.value).toBe('Angular Pwned Password Checker Directive');

        const httpTestingController = TestBed.get(HttpTestingController);
        httpTestingController.verify();
        fixture.detectChanges();
        tick(200);
        fixture.detectChanges();
        httpTestingController.verify();
        tick(200);
        fixture.detectChanges();
        const req = httpTestingController.expectOne('https://api.pwnedpasswords.com/range/7072F');
        expect(req.request.method).toEqual('GET');
        req.flush(passwordSearchResult);

        fixture.detectChanges();

        expect(component.pw.errors).toBe(null);
        httpTestingController.verify();
      });
    }));


    it('should be configurable', fakeSchedulers(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<form [formGroup]="form">
  <input type="password" formControlName="password" pwnedPasswordValidator>
</form>`,
          providers: [{
            provide: PasswordCheckerConfigValue, useValue: {
              pwnedPasswordApiCallDebounceTime: 1000,
              pwnedPasswordMinimumOccurrenceForError: 23174663,
            }
          }],
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(PasswordCheckerLibDirective));
        expect(directiveEl).not.toBeNull();

        expect(component.pw.value).toBe('');

        component.pw.patchValue('123456');
        fixture.detectChanges();

        expect(component.pw.value).toBe('123456');

        tick(400);
        const httpTestingController = TestBed.get(HttpTestingController);
        httpTestingController.verify();
        tick(600);
        const req = httpTestingController.expectOne('https://api.pwnedpasswords.com/range/7C4A8');
        expect(req.request.method).toEqual('GET');
        req.flush(passwordSearchResult);

        fixture.detectChanges();

        expect(component.pw.errors).toBe(null);
        httpTestingController.verify();
      });
    }));
  });

});

