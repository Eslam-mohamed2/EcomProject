import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { routingGuardGuard } from './routing-guard.guard';
import { forgetPassGuard } from './forget-pass.guard';
import { verifyCodeGuard } from './verify-code.guard';
import { DetailesComponent } from './detailes/detailes.component';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate:[routingGuardGuard] },
  { path: 'cart', component: CartComponent,canActivate:[routingGuardGuard] },
  { path: 'wish', component: WishListComponent,canActivate:[routingGuardGuard] },
  { path: 'products', component: ProductsComponent,canActivate:[routingGuardGuard] },
  { path: 'categories', component: CategoriesComponent,canActivate:[routingGuardGuard] },
  { path: 'brands', component: BrandsComponent,canActivate:[routingGuardGuard] },
  { path: 'details/:id', component: DetailesComponent,canActivate:[routingGuardGuard] },
  { path: 'logIn', component: LogInComponent },
  { path: 'payment/:id',loadComponent: ()=> import('./payment/payment.component').then((m)=>m.PaymentComponent) ,canActivate:[routingGuardGuard]},
  { path: 'cashOrder/:id',loadComponent: ()=> import('./cash-order/cash-order.component').then((m)=>m.CashOrderComponent) ,canActivate:[routingGuardGuard]},
  { path: 'allorders',loadComponent: ()=> import('./all-order/all-order.component').then((m)=>m.AllOrderComponent)  ,canActivate:[routingGuardGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'forgetPass', component: ForgetPassComponent },
  { path: 'resetPass', component: ResetPassComponent, canActivate:[verifyCodeGuard] },
  { path: 'verifyCode', component: VerifyCodeComponent, canActivate:[forgetPassGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
