import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError, zip } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) { }

  getProducts(limit:number = 10, offset:number = 0){
    // return this.http.get<Product[]>('https://fakestoreapi.com/products')
    let params = new HttpParams();
    params = params.set('limit', limit);
    params = params.set('offset', offset);
    return this.http.get<Product[]>(`${this.apiUrl}`, { params }).pipe(
      retry(3), 
      map(products => products.map(item => {
        return {...item, taxes: .19 * item.price}
      }))
    );
  }

  fetchReadAndUpdate(id: number, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.updateProduct(id, dto)
    );
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    }).pipe(
      retry(3), 
      map(products => products.map(item => {
        return {...item, taxes: .19 * item.price}
      }))
    );
  }
  
  getProduct(id:number){
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err)
      })
    );
  }

  createProduct(body: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}`, body).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err)
      })
    );
  }

  updateProduct(id: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err)
      })
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err)
      })
    );
  }

  handleErrors(error: HttpErrorResponse): Observable<never>  {
    if (error.status == HttpStatusCode.Forbidden)
      return throwError('No tiene permisos para realizar la solicitud.');
    if (error.status == HttpStatusCode.NotFound)
      return throwError('El producto no existe.');
    if (error.status == HttpStatusCode.InternalServerError)
      return throwError('Error en el servidor.');
    return throwError('Un error inesperado ha ocurrido.');
  }
}
