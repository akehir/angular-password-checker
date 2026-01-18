import { TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordCheckerModule } from '@triangular/password-checker';
import { provideZonelessChangeDetection } from "@angular/core";

describe('ExampleComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        ExampleComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        PasswordCheckerModule,
      ],
      providers: [
        provideZonelessChangeDetection(),
      ],
    }).compileComponents()
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
