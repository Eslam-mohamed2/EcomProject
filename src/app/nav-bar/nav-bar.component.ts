import { Router } from '@angular/router';
import { AuthApiService } from './../auth-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _AuthApiService: AuthApiService, private _Router:Router) {}
  ngOnInit(): void {
    this._AuthApiService.userData.subscribe(() => {
      if (this._AuthApiService.userData.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  }
  logOutMethod(): void {
    localStorage.removeItem('userData');
    this._AuthApiService.userData.next(null);
    this._Router.navigate(['/logIn']);
  }
}
