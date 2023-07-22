import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Directive, Inject, Input, Optional } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import sha1 from 'crypto-js/sha1';
import { Partial, PasswordCheckerConfig, PasswordCheckerConfigValue } from './password-checker.config';

@Directive({
  // eslint-disable-next-line  @angular-eslint/directive-selector
  selector: '[pwnedPasswordValidator][formControlName], [pwnedPasswordValidator][ngModel],[pwnedPasswordValidator][formControl]',
  providers: [
        {
          provide: NG_ASYNC_VALIDATORS,
          useExisting: PasswordCheckerLibDirective,
          multi: true,
        },
      ],
  standalone: true
})
export class PasswordCheckerLibDirective implements AsyncValidator {
  @Input() pwnedPasswordApi: string;
  @Input() pwnedPasswordMinimumOccurrenceForError: number;
  @Input() pwnedPasswordApiCallDebounceTime: number;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(PasswordCheckerConfigValue) config: Partial<PasswordCheckerConfig>,
    ) {

    if (!config) {
      // default initialization in constructor didn't work.
      // conflict with @Optional()?
      config = {};
    }

    this.pwnedPasswordApi =
      config.pwnedPasswordApi
      || 'https://api.pwnedpasswords.com/range/';
    this.pwnedPasswordMinimumOccurrenceForError =
      config.pwnedPasswordMinimumOccurrenceForError
      || 1;
    this.pwnedPasswordApiCallDebounceTime =
      config.pwnedPasswordApiCallDebounceTime
      || 400;
  }

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    const pw = ''.concat(control.value);

    return timer(this.pwnedPasswordApiCallDebounceTime).pipe(
      map(() => {
        const pwSha1 = sha1(pw).toString().toUpperCase();

        return {
          firstPart: pwSha1.substring(0, 5),
          lastPart: pwSha1.substring(5),
        };
      }),
      switchMap(
        (hash) => this.http.get(
          `${this.pwnedPasswordApi}${hash.firstPart}`,  { responseType: 'text' }
          ).pipe(
          map(passwords => passwords.split(/[\r\n]+/)),
          map(passwords => passwords.map((password) => {
              const split =  password.split(':');

              return {
                hash: split[0],
                count: parseInt(split[1], 10),
              };
            }
          )),
          map(passwords => passwords.find(password => password.hash === hash.lastPart)),
        ),
      ),
      map(password => password && password.count >= this.pwnedPasswordMinimumOccurrenceForError
        ? { pwnedPasswordOccurrence: password.count }
        : null),
    );
  }
}
