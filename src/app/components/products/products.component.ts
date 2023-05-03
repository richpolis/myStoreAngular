import { Component, OnInit } from '@angular/core';
import { CreateProduct, Product } from 'src/app/models/product.model';
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
  productChosen: Product = {
    id: 0,
    price: 0,
    images: [],
    title: '',
    category: {
      id: 0,
      name: '',
    },
    description: ''
  };
  
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
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createProduct(): void {
    const body: CreateProduct = {
      title: 'Nuevo producto',
      price: 100,
      description: 'Descripción del producto',
      images: ['https://placeimg.com/640/480/animals?r=0.0159000995422236', 
              'https://placeimg.com/640/480/animals?r=0.0159000995422236'],
      categoryId: 1
    };
    this.productsService.createProduct(body)
      .subscribe((p: Product) => {
          // Guardamos el nuevo producto, en el Array de productos junto con los otros.
          this.products.push(p);
      });
  }


}
