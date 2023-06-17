import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { MaxPriceFilterComponent } from './components/max-price-filter/max-price-filter.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Define routes
const route : Routes =[
{path:'products/:id', component: ProductDetailsComponent},
{path:'maximum-price/:maxPrice', component: ProductListComponent},
{path:'search/:keyword', component : ProductListComponent},
{path:'category/:id', component : ProductListComponent},
{path:'category', component : ProductListComponent},
{path:'products', component : ProductListComponent},
{path:'', redirectTo:'/products', pathMatch: 'full'},
{path:'**', redirectTo:'/products',pathMatch:'full'},
]


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    MaxPriceFilterComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(route),
    BrowserModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
