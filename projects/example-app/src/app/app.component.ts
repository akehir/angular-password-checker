import {Component, ViewEncapsulation} from '@angular/core';
import {ngModule, input, feedback, inputWithConfiguration, moduleWithConfiguration} from './code';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Angular Pwned Password Checker Directive';
  step2 = ngModule;
  step3a = input;
  step3b = inputWithConfiguration;
  step3c = moduleWithConfiguration;
  step4 = feedback;
}
