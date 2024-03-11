import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent {
  constructor(private _AuthApiService: AuthApiService, private _Router:Router) {}
  isLoading: boolean = false;
  errMsg!:string
  forgetPassData: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  sendData(data: FormGroup): void {
    this.isLoading = true;
    console.log(data.value);
    this._AuthApiService.forgetPass(data.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          localStorage.setItem('forgetBtn', 'The Btn has been clicked');
          this._Router.navigate(['/verifyCode']);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errMsg = err.message;
        this.isLoading = false;
      },
    });
  }
}
