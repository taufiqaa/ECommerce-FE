import { Component } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
//  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

products : Product[] = [];
//Inject the Product Service to get data from Services
constructor(private productService : ProductService){}

//Similar to @PostConstruct
ngOnInit():void{
  this.listProduct();
}
//Method is invoked once you subscribe
  listProduct() {
    this.productService.getProductList().subscribe(

      //assign results to the Product Array
      data => {
        this.products = data;
      }
    )
  }

}
