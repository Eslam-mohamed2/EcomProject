import Swal from 'sweetalert2';
import { CartService } from '../cart.service';
import { Products } from '../products';
import { WishListService } from './../wish-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  constructor(
    private _WishListService: WishListService,
    private _CartService: CartService
  ) {}
  showPro():void{
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        this._Products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  _Products!:Products[]
  ngOnInit(): void {
    this.showPro()
  }
deleteItem(pId:string) {
    this._WishListService.removeProFromWishList(pId).subscribe({
      next: ()=>{
        this.showPro();
        this._WishListService.getUserWishList().subscribe({
          next: (res) => {
            this._WishListService.wishNum.next(res.count);
          },
        });
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
  addToCart(pId:string){
    this._CartService.addToCart(pId).subscribe({
      next: (res)=>{
        this._CartService.carItemsNum.next(res.numOfCartItems);
        this._WishListService.getUserWishList().subscribe({
          next: (res) => {
            this._WishListService.wishNum.next(res.count - 1);
          },
        });
        Swal.fire({
          title: `${res.status.toUpperCase()}!`,
          text: `${res.message}!`,
          icon: 'success',
        });
        this.deleteItem(pId)
        this.showPro()
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
  }
}
