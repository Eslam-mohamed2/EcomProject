import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerData, ShippingAddress } from './customer-data';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL: string = `https://ecommerce.routemisr.com`;
  createCashOrder(customerData:ShippingAddress,cartId:string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/${cartId}`,{shippingAddress: customerData})
  }
  createOnlineOrder(customerData:ShippingAddress,cartId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=https://so3s03.github.io/eComm`,{shippingAddress: customerData})
  }
  getUserOrders(cartId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${cartId}`)
  }
}
