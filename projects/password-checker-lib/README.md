# Angular Pwned Password Checker Directive

Protect your users from re-using a password known to be hacked with this simple Angular directive. Check out the [example page](https://password.akehir.com/) to see how it works. The passwords never leave the browser memory and are not transmitted over the network.

## Getting Started

If you just want to use the library to verify the passwords given by your users, follow the following 4 simple steps. For contributing, or building the library locally, see the section on [building](#building) the library.

Supported Angular Versions
| Angular Version  | Password Checker Version |
| ---------------- | ------------------------ |
|  6.x             | 1.0.0                    |
|  7.x             | 2.2.0                    |
|  8.x             | 3.0.0                    |
|  9.x             | 4.0.0                    |
| 10.x             | 5.0.0                    |
| 11.x             | 6.0.0                    |
| 12.x             | 7.0.0                    |
| 13.x             | 8.0.1                    |

### Step 1: Install

Install the npm package, as well as the peer dependency __crypto-js__ (used to calculate the sha1 of the entered password).

```
npm i @triangular/password-checker crypto-js
```

### Step 2: Add to NgModule Imports

Then, add the __PasswordCheckerModule__ to the imports of your app.

```typescript
import { NgModule } from '@angular/core';
import { PasswordCheckerModule } from '@triangular/password-checker';

@NgModule({
    declarations: [
    ],
    imports: [
      PasswordCheckerModule,
    ],
    providers: [],
    bootstrap: [],
})
export class AppModule { }
```

### Step 3: Add Directive to an Input
Now you can use the provided directive __pwnedPasswordValidator__ on your reactive forms, to trigger the validation with the pwned password database whenever the form is being validated.

```html
<input
  pwnedPasswordValidator
  formControlName="password"
  type="password"
>
```

You can configure the directive by providing additional input bindings. Currently the API endpoint, the input debounce time, as well as the minimum occurrence of a password to fail the validation are configurable:

```html
<input
  pwnedPasswordValidator
  pwnedPasswordMinimumOccurrenceForError="1"
  pwnedPasswordApi="https://api.pwnedpasswords.com/range/"
  pwnedPasswordApiCallDebounceTime="400"
  formControlName="password"
  type="password"
>
```

Alternatively, you can configure your module by using the `PasswordCheckerModule.forRoot()` method.

```typescript
@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordCheckerModule.forRoot( {
      pwnedPasswordApiCallDebounceTime: 1000,
      pwnedPasswordMinimumOccurrenceForError: 4,
      pwnedPasswordApi: 'https://api.pwnedpasswords.com/range/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 4: Provide Feedback
Don't forget to provide some feedback to your users:

```html
<div
*ngIf="!form.get('password').pending && form.get('password').errors && form.get('password').errors.pwnedPasswordOccurrence"
class="invalid-feedback">
  <h2>This password has been seen 
  <span class="invalid-feedback--highlight">
  {{form.get('password').errors.pwnedPasswordOccurrence | number:'1.0-0' }}
  </span>
   times before</h2>
  <p>This password has previously appeared in a data breach and should never be used.
  If you've ever used it anywhere before, change it!
  </p>
</div>
```

## Building
As a pre-requisite to build the library, you need to install all the dependencies via `npm install` or `yarn`.

### Building the Library
Before the sample app can be run, you need to build the library itself.

```
npm run ng -- build password-checker-lib --progress=false
```

### Building the Sample App
After building the library, it is either possible to build the sample app, via

```
npm run ng -- build example-app --prod --progress=false
```

,or to run the sample app with a local dev server:

```
npm run ng -- serve
```

## Running the tests

### Unit Tests
There are not many tests, but those that are can be run with:

```
npm run test -- --no-watch --progress=false --code-coverage --browsers ChromeHeadless
```

### And coding style tests

The project follows the [angular style guide](https://angular.io/guide/styleguide) and lints with the following command:

```
npm run lint
```

## Built With

* [Angular](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Gitlab](https://git.akehir.com) - Source Control & CI Runner

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

### Version History

- 1.0.0: Initial Release
- 2.2.0: Code Improvements and Angular 7.x
- 3.0.0: Angular 8.x
- 4.0.0: Angular 9.x
- 5.0.0: Angular 10.x
- 6.0.0: Angular 11.x
- 7.0.0: Angular 12.x
- 8.0.0: Angular 13.x
- 8.0.1: Upgrade rxjs to 7.4

## Authors

* **Raphael Ochsenbein** - *Initial work* - [Akehir](https://github.com/akehir)

See also the list of [contributors](https://github.com/akehir/angular-password-checker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Pwned Passwords](https://haveibeenpwned.com/Passwords) for providing the API
* [CloudFlare](https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/) For sponsoring the hosting of the API
* [angularindepth](https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5) for a tutorial for creating an angular library
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2/) for the readme template

