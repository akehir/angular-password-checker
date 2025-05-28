import {Component, ViewEncapsulation} from '@angular/core';

import {ExampleComponent} from "./example.component";

@Component({
    selector: 'app-root',
    imports: [ExampleComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'example-app-standalone';
}
