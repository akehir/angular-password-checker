import { ModuleWithProviders, NgModule } from '@angular/core';
import { PasswordCheckerLibDirective } from './password-checker-lib.directive';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Partial, PasswordCheckerConfig, PasswordCheckerConfigValue } from './password-checker.config';

@NgModule({ declarations: [],
    exports: [PasswordCheckerLibDirective], imports: [PasswordCheckerLibDirective], providers: [provideHttpClient(withInterceptorsFromDi())] })
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
