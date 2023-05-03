import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;

  products: Product[] = [];
  showProductDetail = false;
  
  constructor(
    private storeService: StoreService, 
    private productsService: ProductsService
  ) { 
    // sync
    this.myShoppingCart = this.storeService.getShoppingCart();
    this.total = this.storeService.getTotal();
  }

  ngOnInit(): void {
    // async
    this.productsService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  onAddProductToShoppingCart(product: Product){
    console.log(product.title, " agregado");
    this.storeService.addProductToShoppingCart(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: number) {
    this.productsService.getProduct(id)
    .subscribe(data => {
      console.log('product', data);
    })
  }


}
