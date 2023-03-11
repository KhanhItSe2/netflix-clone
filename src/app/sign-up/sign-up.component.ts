import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

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

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
