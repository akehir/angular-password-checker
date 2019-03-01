import { Observable, of, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import sha1 from 'crypto-js/sha1';

@Directive({
  // tslint:disable-next-line directive-selector
  selector: '[pwnedPasswordValidator][formControlName], [pwnedPasswordValidator][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: PasswordCheckerLibDirective, multi:
      true}]
})
export class PasswordCheckerLibDirective implements AsyncValidator {
  @Input() pwnedPasswordApi = 'https://api.pwnedpasswords.com/range/';
  @Input() pwnedPasswordMinimumOccurrenceForError = 1;
  @Input() pwnedPasswordApiCallDebounceTime = 400;

  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    const pw = control.value ;

    if (!pw) {
      return of(null);
    }

    return timer(this.pwnedPasswordApiCallDebounceTime).pipe(
      map(() => {
        const pwSha1 = sha1(pw).toString().toUpperCase();

        return {
          firstPart: pwSha1.substring(0, 5),
          lastPart: pwSha1.substring(5),
        };
      }),
      mergeMap(
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
