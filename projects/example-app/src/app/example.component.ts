import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class ExampleComponent {

  constructor(private fb: FormBuilder) {}

  form = this.fb.group( {
    password: ['', Validators.required],
  });

  get pw() { return this.form.get('password'); }
}
