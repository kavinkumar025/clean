import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoreService } from '../data-store.service';
import { FireAuthService } from '../fire-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  isSignIn: boolean = true;
  signUpForm: FormGroup;
  isForgotPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dataService: DataStoreService,
    public auth: FireAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.noWhitespaceValidator]],
      password: ['', [Validators.required]]
    });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public noWhitespaceValidator(control: any) {
    if (control.value && control.value.indexOf(' ') !== -1) {
      return { 'whitespace': true };
    }
    return null;
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).then((userCredential) => {
      if (email === 'prithikamanokaran23@gmail.com') {
        this.router.navigate(['/home']);
        localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
      } else {
        localStorage.setItem('user', JSON.stringify({ role: 'user' }));
        this.router.navigate(['/home']);
      }
      localStorage.setItem('email', email);
    })
      .catch((error) => {
        this.errorMessage = 'Invalid email or password.';
        console.error('Login error:', error);
      });
  }

  onSignUpSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { email, password, name } = this.signUpForm.value;
    this.auth.signUp(email, password).then(
      () => {
        // Handle successful sign-up
        this.isSignIn = true; // Switch to the sign-in form after successful sign-up
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  onForgotPassword(): void {
    this.isForgotPassword = true;
    // Optionally reset the form
    this.loginForm.reset();
  }

  // Handle password reset submission
  onResetPassword(): void {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;
      // this.auth.resetPassword(email).subscribe(
      //   (response: any) => {
      //     // Handle password reset success (notify user, redirect, etc.)
      //     this.errorMessage = 'Password reset link has been sent to your email.';
      //     this.isForgotPassword = false;
      //   },
      //   (error: any) => {
      //     this.errorMessage = 'Error resetting password. Please try again.';
      //   }
      // );
    }
  }

  // Handle Sign Up button click (navigate to sign up page)
  onSignUp(): void {
    this.router.navigate(['/signup']); // Replace with your sign-up route
  }

  // Handle App File button click (you can implement any logic here)
  onAppFile(): void {
    // Example: open a file or redirect
    console.log('App file clicked');
  }
}
