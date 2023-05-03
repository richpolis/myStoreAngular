import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: 0,
    price: 0,
    images: [],
    title: '',
    category: {
      id: 0,
      name: '',
    },
    description: ''
  };;

  @Output() addToCart = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    if(this.product === null){
      this.product = {
        id: 0, 
        title: '', 
        price: 0, 
        images: [],
        description: '', 
        category: {
          id: 0,
          name: ''
        } 
      }
    }
  }

  onAddProductToCard(){
    this.addToCart.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }

}
