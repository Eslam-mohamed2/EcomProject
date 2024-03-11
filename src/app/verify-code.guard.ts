import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const verifyCodeGuard: CanActivateFn = (route, state) => {
  let _Router:Router = inject(Router);
  if(localStorage.getItem("vCode") == null){
    _Router.navigate(['/verifyCode']);
    return false
  }else {
    return true
  }
};
