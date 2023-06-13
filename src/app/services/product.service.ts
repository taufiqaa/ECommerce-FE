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
  
    return this.getProducts(searchUrl);
  }


  getProductCategories(): Observable<ProductCategory[]> {
  
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
 
}

  searchProducts(theKeyword: string): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl)
  }

  maximumPriceProducts(theMaxPrice : number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByUnitPriceLessThan?unitPrice=${theMaxPrice}`;
    
    return this.getProducts(searchUrl)
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductDetail(theProductId : number): Observable<Product>{
    
    const productDetailUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productDetailUrl);
  }

 
}



//unwraps the JSON from Spring DATA REST _embedded entry
interface GetResponseProducts{
  _embedded:{
    products : Product[]
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory : ProductCategory[]
  }
}
