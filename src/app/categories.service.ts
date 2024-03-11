import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL: string = `https://ecommerce.routemisr.com`;
  getAllCat(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories`);
  }
  getSpecificCat(catId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories/${catId}`)
  }
  getCatProduct(catId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?category[in]=${catId}`)
  }
}
