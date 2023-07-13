import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import {ShopFormValidators} from 'src/app/validators/shop-form-validators';

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

  countries: Country[] = [];
  states : State[] = [];
  route: any;

  shippingAddressStates : State[] = [];
  billingAddressStates : State[] = [];

  constructor(private formBuilder: FormBuilder,
              private cartService : CartService,
              private shopFormService : ShopFormService) { }

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(2),ShopFormValidators.preventWhiteSpace]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2), ShopFormValidators.preventWhiteSpace]),
        email: new FormControl ('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),ShopFormValidators.preventWhiteSpace])
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

     //populate countries
      this.shopFormService.getCountries().subscribe(
        data=>{
          console.log("Retrieved Countries " + JSON.stringify(data))
          this.countries = data
        }
      );

      
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
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  this.cartService.computeCartTotals();
  }


  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName (){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}


  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value,
        this.billingAddressStates = this.shippingAddressStates
      );
      
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }
  
  onSubmit() {
    console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }


    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("Email" + this.checkoutFormGroup.get('customer').value.email);

    console.log("Shipping Address Country Code" + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("Shipping Address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);

    console.log("Billing Address Country " + this.checkoutFormGroup.get('billingAddress').value.country.name);
    console.log("Billing Address state is " + this.checkoutFormGroup.get('billingAddress').value.state.name);
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

  getStates(formGroupName : string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode}`)
    console.log(`${formGroupName} country name : ${countryName}`)


    this.shopFormService.getStates(countryCode).subscribe(
      data=>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data;
        }

        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    )
  }

}
