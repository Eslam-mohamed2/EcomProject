import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL: string = `https://ecommerce.routemisr.com`;
  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands`);
  }
  getSpecificBrand(brandId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands/${brandId}`)
  }
  getBrandProducts(brandId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?brand=${brandId}`)
  }
}
