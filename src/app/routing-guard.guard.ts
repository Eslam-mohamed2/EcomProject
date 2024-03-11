import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';

export const routingGuardGuard: CanActivateFn = (route, state) => {
  let _Router:Router = inject(Router)
  let _AuthApiService:AuthApiService = inject(AuthApiService);
  if (localStorage.getItem("userData") == null){
    _Router.navigate(['logIn']);
    return false
  } else {
    _AuthApiService.decodingUserData()
    return true
  }
};
