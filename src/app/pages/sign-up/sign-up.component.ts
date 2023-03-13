import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { filter, startWith, Subject, switchMap, take, tap } from 'rxjs';

const PASSWORD_PATTERN =
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}';

const validateMatchedControlValue = (
  firstControlName: string,
  secondControlName: string
) => {
  return function (formGroup: FormGroup): ValidationErrors | null {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatched: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  formSubmit$ = new Subject<boolean | null>();
  signUpForm = this.fb.group(
    {
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
      passwordConfirm: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
    },
    {
      validators: validateMatchedControlValue('password', 'passwordConfirm'),
    }
  );
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Check input and disable submit button
    this.formSubmit$
      .pipe(
        tap(() => this.signUpForm.markAsDirty),
        switchMap(() =>
          this.signUpForm.statusChanges.pipe(
            startWith(this.signUpForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => this.onSubmit())
      )
      .subscribe();
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.router.navigate(['/sign-in']);
  }
}
