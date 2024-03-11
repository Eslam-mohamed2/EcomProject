import { Products } from './../products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.scss'],
})
export class DetailesComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService
  ) {}
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplaySpeed:3000,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
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
  isDataLoaded: boolean = false;
  productDetails!: Products;
  _id!: string;
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((res) => {
      this._id = res['id'];
    });
    this._ProductsService.productDetails(this._id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        this.isDataLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addItem(pId: string) {
    this._CartService.addToCart(pId).subscribe({
      next: (res)=>{
        this._CartService.carItemsNum.next(res.numOfCartItems);
        Swal.fire({
          title: `${res.status.toUpperCase()}!`,
          text: `${res.message}!`,
          icon: 'success',
        });
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
