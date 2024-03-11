import { Component } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { CartService } from './cart.service';
import { WishListService } from './wish-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eComm';
  isLogin: boolean = false;
  constructor(
    private _AuthApiService: AuthApiService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  cartNum!:number
  wishNum!:number
  ngOnInit(): void {
    this._AuthApiService.userData.subscribe(() => {
      if (this._AuthApiService.userData.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
    this._CartService.getCartItems().subscribe({
      next: (res)=>{
        this._CartService.carItemsNum.next(res.numOfCartItems);
      }
    })
    this._WishListService.getUserWishList().subscribe({
      next: (res)=>{
        this._WishListService.wishNum.next(res.count);
      }
    })
    this._CartService.carItemsNum.subscribe((res)=>{this.cartNum = res})
    this._WishListService.wishNum.subscribe(res=> this.wishNum = res)
  }
}
