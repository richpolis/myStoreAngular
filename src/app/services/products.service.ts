import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(){
    // return this.http.get<Product[]>('https://fakestoreapi.com/products')
    return this.http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products')
  }
  
  getProduct(id:number){
    return this.http.get<Product>(`https://young-sands-07814.herokuapp.com/api/products/${id}`)
  }
}
