import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-max-price-filter',
  templateUrl: './max-price-filter.component.html',
  styleUrls: ['./max-price-filter.component.css']
})
export class MaxPriceFilterComponent implements OnInit{

  constructor(private router : Router ){

  }

  ngOnInit(): void {
      
  }

  doFilterMaximumPrice(value : number){
    console.log(`Maximum Price=${value}`)
    this.router.navigateByUrl(`/maximum-price/${value}`)
  }

}
