import { WishListService } from './../wish-list.service';
import { CartService } from './../cart.service';
import { Brand, Products, request } from './../products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CategoriesService: CategoriesService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  searchData: string = '';
  Categories: Brand[] = [];
  wishListData!:string[]
  categoryOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 4000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  _Products: Products[] = [];
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this._Products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._CategoriesService.getAllCat().subscribe({
      next: (res) => {
        this.Categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._WishListService.getUserWishList().subscribe({
      next: (res)=>{
        let data = res.data.map((item:any)=>item._id)
        this.wishListData = data
      }
    })
  }
  addItem(proId: string): void {
    this._CartService.addToCart(proId).subscribe({
      next: (res) => {
        this._CartService.carItemsNum.next(res.numOfCartItems)
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
  wish(pId: string,event:any) {
    if(!this.wishListData.includes(pId)){
      this._WishListService.addProductToWishList(pId).subscribe({
        next: (res) => {
          this._WishListService.wishNum.next(res.data.length)
          Swal.fire({
            title: `${res.status.toUpperCase()}!`,
            text: `${res.message}!`,
            icon: 'success',
          });
          event.target.classList.add('text-danger')
        },
        error: (err) => {
          console.log(err);
        },
      });
    }else {
      this._WishListService.removeProFromWishList(pId).subscribe({
        next:(res)=>{
          this._WishListService.wishNum.next(res.data.length);
          event.target.classList.remove('text-danger');
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }
}
