import {Component} from '@angular/core';
import {ngModule, input, feedback} from './code';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular Pwned Password Checker Directive';
  step2 = ngModule;
  step3 = input;
  step4 = feedback;

  constructor() {}
}
