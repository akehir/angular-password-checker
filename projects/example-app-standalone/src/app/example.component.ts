import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PasswordCheckerLibDirective} from "@triangular/password-checker";
import {DecimalPipe, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    PasswordCheckerLibDirective,
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
