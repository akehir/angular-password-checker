import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PasswordCheckerLibDirective} from "@triangular/password-checker";
import {DecimalPipe, NgClass, NgIf} from "@angular/common";
import {} from "@angular/common/http";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    PasswordCheckerLibDirective,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    NgClass,
    NgIf,
    DecimalPipe
  ],
  standalone: true
})
export class ExampleComponent {

  constructor(private fb: FormBuilder) {}

  form = this.fb.group( {
    password: ['', Validators.required],
  });

  get pw() { return this.form.get('password'); }
}
