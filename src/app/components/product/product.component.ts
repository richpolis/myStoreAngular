import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product | null = null;

  @Output() addToCart = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
    if(this.product === null){
      this.product = {
        id: 0, 
        title: '', 
        price: 0, 
        image: ''
      }
    }
  }

  onAddProductToCard(){
    if(this.product){
      this.addToCart.emit(this.product);
    }
  }

}
