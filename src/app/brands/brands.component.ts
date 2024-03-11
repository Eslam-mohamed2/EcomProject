import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';
import { CartService } from '../cart.service';
import { Categories } from '../categories';
import { Products } from '../products';
import Swal from 'sweetalert2';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent {
  constructor(
    private _BrandsService: BrandsService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  brands!: Categories[];
  _Products!: Products[];
  wishListData!: string[];
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
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
  displayProdects(brandId: string) {
    this._BrandsService.getBrandProducts(brandId).subscribe({
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
