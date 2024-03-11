import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { Products } from './products';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  carItemsNum: BehaviorSubject<any> = new BehaviorSubject(0);
  baseURL: string = `https://ecommerce.routemisr.com`;
  addToCart(pId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/cart`, {
      productId: pId,
    });
  }
  updateProductQuantity(quant: number, pId: string): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${pId}`, {
      count: quant,
    });
  }
  getCartItems(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`);
  }
  removeItemFromCart(pId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${pId}`);
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`);
  }
}
