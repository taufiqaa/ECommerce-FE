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
  searchMode:boolean = false;
  maximumPrice: number = 9999999999;

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
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    
    this.maximumPrice = +this.route.snapshot.paramMap.has("maxPrice");

    if(this.searchMode){
      this.handledSearchProducts();
    }else if(this.maximumPrice){
      this.handledMaximumPriceProducts();
    }else{
      this.handledListProducts();
    }
  }


  handledSearchProducts(){
    const theKeyword : string = this.route.snapshot.paramMap.get('keyword')!;
    // search for the product using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products =data;
      }
    )

  }

  handledMaximumPriceProducts(){
    const theMaxPrice : number  = +this.route.snapshot.paramMap.get('maxPrice')!;
    this.productService.maximumPriceProducts(theMaxPrice).subscribe(
      data=>{
        this.products=data;
      }
    )

  }


  handledListProducts(){
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
    }
  );
  }


  }
