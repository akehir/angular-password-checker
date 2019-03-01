import { NgModule } from '@angular/core';
import { PasswordCheckerLibDirective } from './password-checker-lib.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PasswordCheckerLibDirective],
  imports: [HttpClientModule],
  exports: [PasswordCheckerLibDirective]
})
export class PasswordCheckerModule { }
