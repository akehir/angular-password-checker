import {InjectionToken} from '@angular/core';

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface PasswordCheckerConfig {
  pwnedPasswordApi: string;
  pwnedPasswordMinimumOccurrenceForError: number;
  pwnedPasswordApiCallDebounceTime: number;
}

export const PasswordCheckerConfigValue = new InjectionToken<Partial<PasswordCheckerConfig>>('PASSWORD_CHECKER_CONFIG');
