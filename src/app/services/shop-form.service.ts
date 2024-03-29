import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {


  private countriesUrl="http://localhost:1234/api/countries";
  private statesUrl="http://localhost:1234/api/states"

  constructor(private httpClient: HttpClient) { }


  getCreditCardMonths(startMonth : number) : Observable<number[]>{

    let data : number[] = [];

    // build an array for "Month" dropdown list
    // start at current month and loop until

    for (let theMonth=startMonth; theMonth<=12; theMonth++){
      data.push(theMonth)
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{

    let data : number[] = [];
    
    const startYear : number = new Date().getFullYear();
    const endYear : number = startYear + 10;

    
    for (let theYear = startYear; theYear<=endYear; theYear++){
      data.push(theYear)
    }
    return of(data);

  }


  getCountries(): Observable<Country[]>{
    
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.country)
    );

  }

  
  getStates(theCountryCode: string): Observable<State[]>{

    const searchStatesUrl=`${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
      );
  }

}



//Unwrap json
  interface GetResponseCountries{
    _embedded:{
      country: Country[];
    }
  }

  interface GetResponseStates{
    _embedded:{
      states: State[];
    }
  }







