import { WishListService } from './../wish-list.service';
import { CartService } from './../cart.service';
import { Products } from '../products';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  _Products!: Products[];
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this._Products = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
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
  p!: number;
  pageSize!: number;
  total!: number;
  wishListData!: string[];
  addItem(pId: string) {
    this._CartService.addToCart(pId).subscribe({
      next: (res) => {
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
  pageChanged(event: any) {
    this._ProductsService.getAllProducts(event).subscribe({
      next: (res) => {
        this._Products = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
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
          event.target.classList.remove('text-danger');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
