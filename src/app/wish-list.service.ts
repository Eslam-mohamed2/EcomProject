import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL: string = `https://ecommerce.routemisr.com`;
  wishNum:BehaviorSubject<any> = new BehaviorSubject(0)
  getUserWishList():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`);
  }
  addProductToWishList(proId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`,{productId: proId});
  }
  removeProFromWishList(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${pId}`)
  }
}
