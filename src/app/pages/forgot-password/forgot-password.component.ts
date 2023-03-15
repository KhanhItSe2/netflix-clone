import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit() {}

  forgotPassForm = this.fb.group({
    username: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(8),
      ]),
    ],
    captcha: ['', Validators.required],
  });
  onSubmit() {
    console.log(this.forgotPassForm.value);
    this.router.navigate(['/home'])
  }
}
