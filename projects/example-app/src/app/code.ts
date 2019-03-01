export const ngModule = `import { PasswordCheckerModule } from '@triangular/password-checker';

@NgModule({
    declarations: [
      AppComponent,
      ...,
    ],
    imports: [
      ...,
      PasswordCheckerModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
`;

export const input = `<input
  pwnedPasswordValidator
  formControlName="password"
  type="password"
>`;

export const inputWithConfiguration = `<input
  pwnedPasswordValidator
  pwnedPasswordMinimumOccurrenceForError="1"
  pwnedPasswordApi="https://api.pwnedpasswords.com/range/"
  pwnedPasswordApiCallDebounceTime="400"
  formControlName="password"
  type="password"
>`;


export const feedback = `<div
*ngIf="!pw.pending && pw.errors && pw.errors.pwnedPasswordOccurrence"
class="invalid-feedback">
  <h2>This password has been seen
  <span class="invalid-feedback--highlight">
  {{pw.errors.pwnedPasswordOccurrence | number:'1.0-0' }}
  </span>
   times before</h2>
  <p>This password has previously appeared in a data breach and should never be used.
  If you've ever used it anywhere before, change it!
  </p>
</div>`;
