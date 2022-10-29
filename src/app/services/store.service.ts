import { Injectable } from '@angular/core';
import { Product } from '../../app/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();


  constructor() { }

  addProductToShoppingCart(product: Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum,item) => sum + item.price, 0);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getCountItems(){
    return this.myShoppingCart.length;
  }

}
