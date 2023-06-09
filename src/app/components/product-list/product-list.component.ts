import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] | undefined;
  currentCategoryId: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    });
    this.listProduct();
  }

  listProduct() {
    //check if "id" parameter is available
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.currentCategoryId = +params.get('id')!;
      } else {
        this.currentCategoryId = 1;
      }
      console.log('currentCategoryId:', this.currentCategoryId);
  
      //now get the products for the given category id
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
      );
    });
  }
  }
