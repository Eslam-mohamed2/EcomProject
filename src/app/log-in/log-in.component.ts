import { AuthApiService } from './../auth-api.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router
  ) {}
  isLoading: boolean = false;
  errMsg!: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
      ),
    ]),
  });
  logIn(lForm: FormGroup) {
    this.isLoading = true;
    this._AuthApiService.signInData(lForm.value).subscribe({
      next: (data) => {
        if (data.message == 'success'){
          localStorage.setItem('userData', data.token);
          this._AuthApiService.decodingUserData()
          this._Router.navigate(['/home']);
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
