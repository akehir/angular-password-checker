import { Component, ViewEncapsulation, inject } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false // eslint-disable-line @angular-eslint/prefer-standalone
})
export class ExampleComponent {
  private fb = inject(FormBuilder);


  form = this.fb.group( {
    password: ['', Validators.required],
  });

  get pw() { return this.form.get('password'); }
}
