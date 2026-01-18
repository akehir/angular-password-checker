import { TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideZonelessChangeDetection } from "@angular/core";

describe('ExampleComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ExampleComponent,
      ],
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents()
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
