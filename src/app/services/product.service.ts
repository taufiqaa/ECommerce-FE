import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl= 'http://localhost:1234/api/products';

  //inject Http client
  constructor(private httpClient : HttpClient) { }

  // Returns an observable map the JSON data from Spring Data REST to Product Array
  getProductList() : Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

//unwraps the JSON from Spring DATA REST _embedded entry
interface GetResponse{
  _embedded:{
    products : Product[]
  }
}
