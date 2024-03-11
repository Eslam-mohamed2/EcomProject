import { CartService } from './../cart.service';
import { Categories } from '../categories';
import { Products } from '../products';
import { CategoriesService } from './../categories.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private _CategoriesService: CategoriesService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  categories!: Categories[];
  _Products!: Products[];
  wishListData!: string[];
  ngOnInit(): void {
    this._CategoriesService.getAllCat().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        let data = res.data.map((item: any) => item._id);
        this.wishListData = data;
      },
    });
  }
  showCat(catId: string) {
    this._CategoriesService.getCatProduct(catId).subscribe({
      next: (res) => {
        this._Products = res.data;
        window.scrollTo(10000, 10000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addItem(itemId: string) {
    this._CartService.addToCart(itemId).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.numOfCartItems);
        this._CartService.carItemsNum.next(res.numOfCartItems);
        Swal.fire({
          title: `${res.status.toUpperCase()}!`,
          text: `${res.message}!`,
          icon: 'success',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  wish(pId: string, event: any) {
    if (!this.wishListData.includes(pId)) {
      this._WishListService.addProductToWishList(pId).subscribe({
        next: (res) => {
          this._WishListService.wishNum.next(res.data.length);
          Swal.fire({
            title: `${res.status.toUpperCase()}!`,
            text: `${res.message}!`,
            icon: 'success',
          });
          event.target.classList.add('text-danger');
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this._WishListService.removeProFromWishList(pId).subscribe({
        next: (res) => {
          this._WishListService.wishNum.next(res.data.length);
          event.target.classList.add('text-danger');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
