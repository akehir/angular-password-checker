import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { AppComponent } from './app.component';
import { PasswordCheckerLibModule } from 'password-checker-lib';
import { ExampleComponent } from './example.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordCheckerLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
