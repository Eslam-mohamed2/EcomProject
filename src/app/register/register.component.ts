import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    // Constructor
  constructor(private _AuthApiService: AuthApiService, private _Router: Router) { }
  // varibales
  errorMessage!: string;
  successMessage!: string;
  isItLoading: boolean = false;
  passwordRjx: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*^])[A-Za-z\d@.#$!%*?&]{8,15}$/
  //Form Control
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRjx)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRjx)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  }, this.isItMatched)


  //Methods
  registerSubmit() {
     
    this._AuthApiService.signUpData(this.registerForm.value).subscribe({
      next: (res) => {
        // console.log(res)
        this._Router.navigate(['/logIn'])
        this.successMessage = res.message;
        this.isItLoading = true;
      },

      error: (err) => { this.errorMessage = err.error.message; }
    })
  }

  isItMatched(registerForm: any) {
    if (registerForm.get('password')?.value == registerForm.get('rePassword')?.value) {
      return null
    } else {
      return { "required": true }
    }
  }
}
