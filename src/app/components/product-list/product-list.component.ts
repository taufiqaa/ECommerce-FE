import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
// import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode:boolean = false;
  previouslyCategoryId: number =1;
  previousKeyword : string = "";
  maximumPrice: number = 9999999999;
  // pageEvent: PageEvent;

  //new properties for pagination
  thePageNumber : number = 1;
  thePageSize : number = 5;
  theTotalElements: number = 0;
 
 

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService : CartService) {}

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

    // if we have a different keyword than previous
    // then we set thePageNumber to 1

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`previousKeyword = ${this.previousKeyword}, thePageNumber=${this.thePageNumber}`);

    // search for the product using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                                this.thePageSize,
                                                theKeyword).subscribe(this.processResult());
    
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
  
      // check if we have a different category than previous
      // Note : angular will reuse a component if it is currently being viewed
      //


      //if we have a different category id than previous
      // the set thePageNumber back to 1
      if(this.previouslyCategoryId != this.currentCategoryId){
        this.thePageNumber=1;
      }


      this.previouslyCategoryId = this.currentCategoryId;
      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

      this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                  this.thePageSize,
                                                  this.currentCategoryId).subscribe(
                                                    this.processResult()
                                                  );


    }
  );
  }

    updatePageSize(pageSize: string){
      this.thePageSize = +pageSize;
      this.thePageNumber = 1;
      this.listProduct();
    }

    processResult(){
      return (data:any)=>{
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
    }

    addToCart(theProduct : Product){
      console.log(`Adding to cart : ${theProduct.name},${theProduct.unitPrice} `);

      const theCartItem = new CartItem(theProduct);

      this.cartService.addToCart(theCartItem);

    }


  }
