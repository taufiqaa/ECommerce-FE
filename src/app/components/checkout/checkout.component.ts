import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  
  checkoutFormGroup: FormGroup | any;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears : number [] = [];
  creditCardMonths : number [] = [];

  constructor(private formBuilder: FormBuilder,
              private cartService : CartService,
              private shopFormService : ShopFormService) { }

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
        shippingAddress : this.formBuilder.group({
        country : [''],
        street: [''],
        city : [''],
        state : [''],
        zipCode : [''],
      }),   
      billingAddress : this.formBuilder.group({
        country : [''],
        street: [''],
        city : [''],
        state : [''],
        zipCode : [''],
      }),
      creditCard : this.formBuilder.group({
        cardType : [''],
        nameOnCard: [''],
        cardNumber : [''],
        securityCode : [''],
        expirationMonth : [''],
        expirationYear : [''],
      })
    });

    //populate credit card months
    const startMonth : number = new Date().getMonth() + 1;
    console.log("startMonth : " + startMonth);

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data=> {
        this.creditCardMonths = data}
    );


    //populate credit card years
    this.shopFormService.getCreditCardYears().subscribe(
      data=> {
        this.creditCardYears = data
      }
    );

  this.listCheckoutDetails()
  }


  listCheckoutDetails() {
    
    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data=> this.totalQuantity = data
    );

  this.cartService.computeCartTotals();
  }


  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
  
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("Email" + this.checkoutFormGroup.get('customer').value.email);
  }


  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    
    const currentYear : number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);


    //if the current year equals the selected year, then start with the current month

    let startMonth: number;


    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        this.creditCardMonths = data;
      }
    )
  }

}
