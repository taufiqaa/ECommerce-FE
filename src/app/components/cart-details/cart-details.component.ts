import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

 
  
  cartItems: CartItem[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService){}
 
 
 
  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails() {
    // Get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
  
    
    // Subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
  
    // Subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // Compute cart total price and quantity
    this.cartService.computeCartTotals();
  }
  
 
  
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.removeFromCart(theCartItem);
  }

}
  // decrementQuantity(theCartItem: CartItem) {
  //   theCartItem.quantity--;
  
  //   if (theCartItem.quantity === 0) {
  //     this.removeFromCart(theCartItem);
  //   } else {
  //     this.computeCartTotals();
  //   }
  // }
  




