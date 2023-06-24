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

 
  products: Product[] = [];
  cartItems: CartItem[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService){}
 
 
 
  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails() {
    // Get a handle to the cart items
    const cartItems = this.cartService.cartItems;
  
    // Create a map to store the combined cart items based on product name
    const combinedCartItems = new Map<string, CartItem>();
  
    // Iterate over the cart items and combine the quantities
    for (const cartItem of cartItems) {
      const existingCartItem = combinedCartItems.get(cartItem.name);
  
      if (existingCartItem) {
        existingCartItem.quantity += cartItem.quantity;
      } else {
        combinedCartItems.set(cartItem.name, { ...cartItem });
      }
    }
  
    // Assign the combined cart items to the component variable
    this.cartItems = Array.from(combinedCartItems.values());
   
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
    
   return this.cartService.addToCart(theCartItem);
  }

  
  getCartItemQuantity(theCartItem: CartItem): number {
    return this.cartService.getCartItemQuantity(theCartItem);
  }
  
  decrementQuantity(theCartItem : CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  removeFromCart(theCartItem : CartItem){
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
  




