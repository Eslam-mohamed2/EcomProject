import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const forgetPassGuard: CanActivateFn = (route, state) => {
  let _Router: Router = inject(Router);
  if(localStorage.getItem('forgetBtn') == null){
    _Router.navigate(['/forgetPass']);
    return false
  }else {
    return true
  }
};
