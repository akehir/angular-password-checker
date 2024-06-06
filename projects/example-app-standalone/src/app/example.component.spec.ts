import { TestBed, waitForAsync } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('ExampleComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ExampleComponent,
      ],
      providers: [provideHttpClientTesting()]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
