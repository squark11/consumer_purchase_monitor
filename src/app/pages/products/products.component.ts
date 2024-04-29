import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Item } from 'src/app/models/item';
import { FiltersProduct } from 'src/app/models/filtersProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  Page = 1;
  PageSize = 5;
  collectionSize=1;
  SortBy='';
  SortDirection=1;
  searchPhrase: string;
  products: Item[];
  filters: FiltersProduct;

  constructor(private http: HttpService, private authService: AuthenticationService, private productService:ProductsService) {
    this.refreshPage();
  }

  ngOnInit(): void {
    this.refreshPage();
  }

  refreshPage() {
    const params = new HttpParams()
      .set('SearchPhrase', this.searchPhrase || '')
      .set('PageNumber', this.Page.toString())
      .set('PageSize', this.PageSize.toString())
      .set('SortDirection', this.SortDirection.toString())
      .set('SortBy', this.SortBy);
      console.log(params);

    this.http.getProducts(params).subscribe(products => {
      console.log(products);
      this.collectionSize = products.totalItemsCount;
      this.products = products.items;
    });
  }
  sortBy(x){
    this.SortBy = x;
    this.SortDirection ==0?this.SortDirection=1:this.SortDirection=0;
    this.refreshPage();
  }
  delete(id:number){
    this.productService.deleteProduct(id).subscribe(
      result => {
        console.log(result);
        this.refreshPage();
      },
      error => console.error(error)
    );
  }
}
