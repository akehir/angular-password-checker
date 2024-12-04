import {Component, ViewEncapsulation} from '@angular/core';
import {ngModule, input, feedback, inputWithConfiguration, moduleWithConfiguration} from './code';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class AppComponent {
  title = 'Angular Pwned Password Checker Directive';
  step2 = ngModule;
  step3a = input;
  step3b = inputWithConfiguration;
  step3c = moduleWithConfiguration;
  step4 = feedback;
}
