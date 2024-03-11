import { OrdersService } from './../orders.service';
import { Data } from './../cart-items';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, private _OrdersService:OrdersService) {}
  cartProducts!: Data | null;
  ngOnInit(): void {
    this._CartService.getCartItems().subscribe({
      next: (res) => {
        this.cartProducts = res.data;
        localStorage.setItem('userCartId', res.data.cartOwner);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  delItem(pId: string): void {
    this._CartService.removeItemFromCart(pId).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.carItemsNum.next(res.numOfCartItems);
        this.cartProducts = res.data;
        Swal.fire({
          title: `${res.status.toUpperCase()}!`,
          text: `This Item Has Been Deleted!`,
          icon: 'success',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  proCount(count: number, pId: string):void {
    this._CartService.updateProductQuantity(count, pId).subscribe({
      next: (res) => {
        this.cartProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  proQuantity(quantity: string, count: number, pId: string): void {
    if (quantity == 'plus') {
      count = Number(count) + 1;
      this.proCount(count, pId);
    } else {
      count = Number(count) - 1;
      if (count == 0) {
        this._CartService.removeItemFromCart(pId).subscribe({
          next: (res) => {
            this._CartService.getCartItems().subscribe({
              next: (res) => {
                console.log(res);
                this._CartService.carItemsNum.next(res.numOfCartItems);
              },
            });
            this.cartProducts = null;
            this.cartProducts = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.proCount(count, pId);
      }
    }
  }
  clr():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        this.cartProducts = null;
        this._CartService.carItemsNum.next(0)
        Swal.fire({
          title: `${res.message.toUpperCase()}!`,
          text: `Your Cart Has Been Cleared!`,
          icon: 'success',
        });
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
}
