import { ModuleWithProviders, NgModule } from '@angular/core';
import { PasswordCheckerLibDirective } from './password-checker-lib.directive';
import { HttpClientModule } from '@angular/common/http';
import { Partial, PasswordCheckerConfig, PasswordCheckerConfigValue } from './password-checker.config';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, PasswordCheckerLibDirective],
  exports: [PasswordCheckerLibDirective]
})
export class PasswordCheckerModule {
  static forRoot(config: Partial<PasswordCheckerConfig> = {}): ModuleWithProviders<PasswordCheckerModule> {
    return {
      ngModule: PasswordCheckerModule,
      providers: [
        {
          provide: PasswordCheckerConfigValue,
          useValue: config,
        }
      ]
    };
  }
}
