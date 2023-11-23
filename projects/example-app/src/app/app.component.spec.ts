import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordCheckerModule } from '@triangular/password-checker';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExampleComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        PasswordCheckerModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Angular Pwned Password Checker Directive'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular Pwned Password Checker Directive');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular Pwned Password Checker Directive');
  });
});
