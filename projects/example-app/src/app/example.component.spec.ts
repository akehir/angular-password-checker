import { TestBed, async } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordCheckerLibModule} from 'password-checker-lib';

describe('ExampleComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExampleComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        PasswordCheckerLibModule,
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
