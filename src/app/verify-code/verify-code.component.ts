import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent {
  constructor(private _Router: Router, private _AuthApiService:AuthApiService) {}
  validCode:boolean = false;
  errMsg!:string
  isLoading: boolean = false;
  verifying: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  sendCode(code: FormGroup) {
    this.isLoading = true;
    console.log(code.value);
    this._AuthApiService.verifyCode(code.value).subscribe({
      next: (data)=>{
        if (data.status == 'Success'){
          localStorage.setItem('vCode', 'vCode is Good');
          this.validCode = true;
          setTimeout(()=>{
            this._Router.navigate(['/resetPass']);
            this.validCode = false
          },2000)
        }
        this.isLoading = false;
      },
      error : (err)=>{
        this.errMsg = err.error.message;
        this.isLoading = false
      }
    })
  }
}
