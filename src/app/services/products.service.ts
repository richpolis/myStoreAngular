import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';


  constructor(private http: HttpClient) { }

  getProducts(){
    // return this.http.get<Product[]>('https://fakestoreapi.com/products')
    return this.http.get<Product[]>(`${this.apiUrl}`)
  }
  
  getProduct(id:number){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

  createProduct(body: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}`, body);
  }

  updateProduct(id: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
