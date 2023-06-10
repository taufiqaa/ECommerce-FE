import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

//http://localhost:1234/api/products = only the 20 first items
//http://localhost:1234/api/products?size=x, x = items that want to appear

  private baseUrl= 'http://localhost:1234/api/products';

  private categoryUrl = 'http://localhost:1234/api/product-category';

  //inject Http client
  constructor(private httpClient : HttpClient) { }

  // Returns an observable map the JSON data from Spring Data REST to Product Array
  getProductList(theCategoryId: number): Observable<Product[]> {
    // Build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByProductCategoryId?id=${theCategoryId}`;
  
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {
  
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
 
}
}

//unwraps the JSON from Spring DATA REST _embedded entry
interface GetResponseProduct{
  _embedded:{
    products : Product[]
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory : ProductCategory[]
  }
}
