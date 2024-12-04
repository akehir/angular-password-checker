import {Component, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExampleComponent} from "./example.component";

@Component({
    selector: 'app-root',
    imports: [CommonModule, ExampleComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'example-app-standalone';
}
