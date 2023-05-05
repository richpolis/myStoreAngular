import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
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
  
  limit = 10;
  offset = 0;
  
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
    this.productsService.getProducts(10, 0)
    .subscribe(res => {
      this.products = res;
      this.offset += this.limit;
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
    }, err => {
      alert(err);  // Aquí se emitirá el alerta con el mensaje que `throwError` devuelva.
    })
  }

  createProduct(): void {
    const body: CreateProductDTO = {
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

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title',
    }
    const productId = this.productChosen.id;
    this.productsService.updateProduct(productId, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const productId = this.productChosen.id;
    this.productsService.deleteProduct(productId)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }


}
