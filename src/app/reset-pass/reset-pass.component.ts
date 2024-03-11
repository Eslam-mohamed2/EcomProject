import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../auth-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent {
  constructor(private _AuthApiService: AuthApiService, private _Router:Router) {}
  errMsg!:string
  successMsg!:string
  isLoading: boolean = false;
  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
      ),
    ]),
  });
  changePass(data: FormGroup): void {
    this.isLoading = true;
    console.log(data.value);
    this._AuthApiService.newPass(data.value).subscribe({
      next: (data)=>{
        this.successMsg = data.token;
        localStorage.removeItem('vCode');
        localStorage.removeItem('forgetBtn');
        setTimeout(()=>{
          this._Router.navigate(['/logIn']);
        },2000)
        this.isLoading = false;
      },
      error: (err)=>{ 
        console.log(err);
        this.errMsg = err.message
        this.isLoading = false;
      }
    })
  }
}
